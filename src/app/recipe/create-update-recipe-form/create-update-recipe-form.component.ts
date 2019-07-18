import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RecipeService } from 'src/app/shared/services/recipe.service';
import { Recipe } from 'src/app/shared/models/recipe.model';

@Component({
    selector: 'app-create-update-recipe-form',
    templateUrl: './create-update-recipe-form.component.html',
    styleUrls: ['./create-update-recipe-form.component.css']
})
export class CreateUpdateRecipeFormComponent implements OnInit {

    private createUpdateRecipeForm: FormGroup;
    private tags: string[];
    private errorText: string;

    constructor(private builder: FormBuilder,
        private recipeService: RecipeService) { }

    ngOnInit() {
        this.createUpdateRecipeForm = this.builder.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            content: ['', Validators.required]
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
        this.recipeService.createRecipe(model).subscribe(res => {
            this.handleSuccessfulRecipeCreation(res as Recipe);
        }, errors => {
            this.errorText = errors.error.errors[0];
        });
    }

    private handleSuccessfulRecipeCreation(response: Recipe){
        this.errorText = JSON.stringify(response);
    }
}
