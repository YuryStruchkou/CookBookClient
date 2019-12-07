import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { User } from '../models/user.model';
import { UserProfileService } from '../services/user-profile.service';
import { AuthService } from '../services/auth.service';
import { UserProfile } from '../models/user-profile.model';
import { catchError, flatMap } from 'rxjs/operators';

@Injectable()
export class UserDetailsResolver implements Resolve<UserProfile> {
    private currentUser: User;

    constructor(private userProfileService: UserProfileService, private router: Router, private authService: AuthService) {
        this.authService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = parseInt(route.paramMap.get('id'));
        return this.userProfileService.getUserProfile(id).pipe(flatMap(result => {
            let user = result as UserProfile;
            if (route.data['update'] && this.currentUser.userName != user.userName) {
                this.router.navigate(["/404"]);
                return of(null);
            }
            return of(user);
        }), catchError(error => {
            this.router.navigate(["/404"]);
            return of(null);
        }));
    }
}
