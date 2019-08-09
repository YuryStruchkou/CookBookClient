import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from '../models/recipe.model';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class UserDetailsResolver implements Resolve<Recipe> {

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return of(null);
    }
}
