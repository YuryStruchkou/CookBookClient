import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { RecipeService } from '../services/recipe.service';
import { Injectable } from '@angular/core';
import { flatMap } from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';
import { RecipeNotes } from '../models/recipe-notes.model';

@Injectable()
export class PopularRecentRecipesResolver implements Resolve<any> {
    constructor(private recipeService: RecipeService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const popularRecipesRequest = this.recipeService.getPopularRecipes().pipe(flatMap(result => {
            const popularRecipes = result as RecipeNotes[];
            return of (popularRecipes);
        }));
        const recentRecipesRequest = this.recipeService.getRecentRecipes().pipe(flatMap(result => {
            const recentRecipes = result as RecipeNotes[];
            return of(recentRecipes);
        }));
        return forkJoin(popularRecipesRequest, recentRecipesRequest).pipe(flatMap(result => {
            return of(result);
        }));
    }
}
