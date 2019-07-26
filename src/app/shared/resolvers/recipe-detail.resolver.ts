import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from '../services/recipe.service';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

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
        return this.recipeService.getRecipe(id).pipe(map(result => {
            const recipe = result as Recipe;
            if (!route.data['update'] || this.currentUser.userName == recipe.userName) {
                return recipe as Recipe;
            }
            this.router.navigate(["/404"]);
            return of(null);
        }), catchError(error => {
            this.router.navigate(["/404"]);
            return of(null);
        }));
    }
}
