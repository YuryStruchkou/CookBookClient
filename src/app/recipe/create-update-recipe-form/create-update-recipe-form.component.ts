import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RecipeService } from 'src/app/shared/services/recipe.service';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

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
        private recipeService: RecipeService) {
    }

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
        this.recipeService.createRecipe(model).subscribe({
            next: this.handleSuccessfulRecipeCreation.bind(this),
            error: this.handleError.bind(this)
        });
    }

    private handleSuccessfulRecipeCreation(res: Object) {
        const response = res as Recipe;
        this.errorText = JSON.stringify(response);
    }

    private handleError(errors: any) {
        this.errorText = errors.error.errors[0];
    }
}
