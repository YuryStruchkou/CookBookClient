import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/shared/services/recipe.service';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-recipe-main',
    templateUrl: './recipe-main.component.html',
    styleUrls: ['./recipe-main.component.css']
})
export class RecipeMainComponent implements OnInit {
    private recipe = new BehaviorSubject<Recipe>(null);

    constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) { }

    private get recipeValue() {
        return this.recipe.value;
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            const id = params["id"];
            this.initRecipe(id);
        });
    }

    private initRecipe(id: number) {
        this.recipeService.getRecipe(id).subscribe({
            next: (recipe => {
                this.recipe.next(recipe as Recipe);
            }).bind(this),
            error: (err => {
                this.router.navigate(["/404"]);
            }).bind(this)
        });
    }
}
