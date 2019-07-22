import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RefreshTokenService } from '../services/refresh-token.service';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router, private refreshTokenService: RefreshTokenService) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authService.isLoggedIn) {
            return true;
        }
        this.authService.redirectUrl = this.router.url;
        return this.refreshTokenService.refresh().pipe(map(res => {
            this.authService.addUserToLocalStorage(res as User);
            return true;
        }), catchError(error => {
            return of(this.router.parseUrl("/account/login"));
        }));
    }

}
