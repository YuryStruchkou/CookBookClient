import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/shared/services/recipe.service';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
    selector: 'app-recipe-main',
    templateUrl: './recipe-main.component.html',
    styleUrls: ['./recipe-main.component.css']
})
export class RecipeMainComponent implements OnInit {
    private recipe: Recipe;
    private currentUser: User;

    constructor(private recipeService: RecipeService,
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router) {
        this.authService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    ngOnInit() {
        this.recipe = this.route.snapshot.data.recipe;
    }
}
