import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { flatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { RecipeNotes } from '../models/recipe-notes.model';
import { SearchService } from '../services/search.service';

@Injectable()
export class SearchResolver implements Resolve<RecipeNotes[]> {
    constructor(private searchService: SearchService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const query = route.queryParamMap.get("query") as string;
        const page = parseInt(route.queryParamMap.get("page"));
        return this.searchService.searchRecipes(query, page).pipe(flatMap(result => {
            const recipes = result as RecipeNotes[];
            return of(recipes);
        }));
    }
}
