import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { AccountService } from '../services/account.service';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router, private accountService: AccountService) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authService.isAdmin) {
            return true;
        }
        if (this.authService.isLoggedIn) {
            return of(this.router.parseUrl("/404"));
        }
        return this.accountService.refresh().pipe(map(res => {
            this.authService.addUserToLocalStorage(res as User);
            if (!this.authService.isAdmin) {
                throwError("User is not admin.");
            }
            return true;
        }), catchError(error => {
            return of(this.router.parseUrl("/404"));
        }));
    }

}
