import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from '../services/recipe.service';
import { Injectable } from '@angular/core';
import { map, catchError, flatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { CurrentUserVote } from '../models/current-user-vote.model';

@Injectable()
export class RecipeDetailResolver implements Resolve<Recipe> {
    private currentUser: User;

    constructor(private recipeService: RecipeService, private router: Router, private authService: AuthService) {
        this.authService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = parseInt(route.paramMap.get('id'));
        return this.recipeService.getRecipe(id).pipe(flatMap(result => {
            const recipe = result as Recipe;
            if (route.data['update'] && (this.currentUser.userName == recipe.userName || this.currentUser.userRole == Roles.ADMIN)) {
                return of(recipe);
            }
            if (!route.data['update']) {
                return this.addUserVoteToRecipe(recipe);
            }
            this.router.navigate(["/404"]);
            return of(null);
        }), catchError(error => {
            this.router.navigate(["/404"]);
            return of(null);
        }));
    }

    private addUserVoteToRecipe(recipe: Recipe) {
        if (this.currentUser == null) {
            return of(recipe);
        }
        return this.recipeService.getCurrentUserVote(recipe.id).pipe(map(result => {
            recipe.recipeVoteData.userVote = (result as CurrentUserVote).voteValue;
            return recipe;
        }));
    }
}
