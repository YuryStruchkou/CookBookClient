import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RecipeService } from 'src/app/shared/services/recipe.service';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-create-update-recipe-form',
    templateUrl: './create-update-recipe-form.component.html',
    styleUrls: ['./create-update-recipe-form.component.css']
})
export class CreateUpdateRecipeFormComponent implements OnInit {
    private createUpdateRecipeForm: FormGroup;
    private recipe = new BehaviorSubject<Recipe>(null);
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
                this.populateInitialValues();
            }
        });
    }

    private populateInitialValues() {
        this.activeRoute.params.subscribe(params => {
            const id = params["id"];
            this.initRecipe(id);
        });
    }

    private initRecipe(id: number) {
        this.recipeService.getRecipe(id).subscribe({
            next: (recipe => {
                this.recipe.next(recipe);
                this.createUpdateRecipeForm.patchValue({
                    name: recipe.name,
                    description: recipe.description,
                    content: recipe.content
                });
            }).bind(this),
            error: (err => {
                this.router.navigate(["/404"]);
            }).bind(this)
        });
    }

    private get f() { return this.createUpdateRecipeForm.controls }

    private tagsChanged(tags: string[]) {
        this.tags = tags;
    }

    onSubmit() {
        const model = {
            Name: this.createUpdateRecipeForm.controls.name.value,
            Description: this.createUpdateRecipeForm.controls.description.value,
            Content: this.createUpdateRecipeForm.controls.content.value,
            Tags: this.tags
        };
        const request = this.isUpdate ? this.recipeService.updateRecipe(model, this.recipe.value.id) : this.recipeService.createRecipe(model);
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
