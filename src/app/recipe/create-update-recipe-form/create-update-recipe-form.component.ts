import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RecipeService } from 'src/app/shared/services/recipe.service';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageUploadComponent } from 'src/app/common-components/image-upload/image-upload.component';

@Component({
    selector: 'app-create-update-recipe-form',
    templateUrl: './create-update-recipe-form.component.html',
    styleUrls: ['./create-update-recipe-form.component.css']
})
export class CreateUpdateRecipeFormComponent implements OnInit {
    @ViewChild(ImageUploadComponent, { static: false }) imageUploadComponent: ImageUploadComponent;
    private createUpdateRecipeForm: FormGroup;
    private recipe: Recipe;
    private tags: string[];
    private errorText: string;
    private isUpdate: boolean;

    constructor(private builder: FormBuilder,
        private activeRoute: ActivatedRoute,
        private router: Router,
        private recipeService: RecipeService) { }

    ngOnInit() {
        this.createUpdateRecipeForm = this.builder.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            content: ['', Validators.required]
        });
        this.activeRoute.data.subscribe(data => {
            this.isUpdate = data.update;
            if (this.isUpdate) {
                this.setInitialValues();
            }
        });
    }

    private setInitialValues() {
        this.recipe = this.activeRoute.snapshot.data.recipe;
        this.createUpdateRecipeForm.patchValue({
            name: this.recipe.name,
            description: this.recipe.description,
            content: this.recipe.content
        });
    }

    private get f() { return this.createUpdateRecipeForm.controls }

    private tagsChanged(tags: string[]) {
        this.tags = tags;
    }

    onSubmit() {
        this.imageUploadComponent.submit();
    }

    sendRequest(publicId: string) {
        const model = {
            Name: this.createUpdateRecipeForm.controls.name.value,
            Description: this.createUpdateRecipeForm.controls.description.value,
            Content: this.createUpdateRecipeForm.controls.content.value,
            Tags: this.tags,
            ImagePublicId: publicId || (this.recipe != null ? this.recipe.imagePublicId : null)
        };
        const request = this.isUpdate ? this.recipeService.updateRecipe(model, this.recipe.id) : this.recipeService.createRecipe(model);
        request.subscribe({
            next: this.handleSuccess.bind(this),
            error: this.handleError.bind(this)
        });
    }

    private handleSuccess(res: Object) {
        const recipe = res as Recipe;
        this.router.navigate(['/recipe', recipe.id]);
    }

    private handleError(errors: any) {
        this.errorText = errors.error.errors[0];
    }
}
