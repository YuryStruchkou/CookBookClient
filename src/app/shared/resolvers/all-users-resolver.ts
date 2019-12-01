import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { catchError, flatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserProfile } from '../models/user-profile.model';
import { UserProfileService } from '../services/user-profile.service';

@Injectable()
export class AllUsersResolver implements Resolve<UserProfile[]> {
    constructor(private userService: UserProfileService, private router: Router, private authService: AuthService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.userService.getAllUsers().pipe(flatMap(result => {
            const users = result as UserProfile[];
            return of(users);
        }), catchError(error => {
            this.router.navigate(["/404"]);
            return of(null);
        }));
    }
}
