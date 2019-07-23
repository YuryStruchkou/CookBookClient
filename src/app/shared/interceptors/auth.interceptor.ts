import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { tap, switchMap, catchError } from 'rxjs/operators';
import { AppConfigService } from '../services/app-config.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RefreshTokenService } from '../services/refresh-token.service';
import { User } from '../models/user.model';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private refreshTokenEndpoint = AppConfigService.settings.apiEndpoints.refreshToken;

    constructor(private refreshTokenService: RefreshTokenService, private router: Router, private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        return next.handle(request).pipe(catchError(error => {
                if (!(error instanceof HttpErrorResponse) || error.status !== HttpStatusCodes.UNAUTHORIZED) {
                    return;
                }
                if (request.url.endsWith(this.refreshTokenEndpoint)) {
                    this.authService.redirectUrl = this.router.url;
                    this.navigateToLogin();
                }
                else {
                    return this.refresh().pipe(switchMap(() => {
                        return next.handle(this.updateAuthHeader(request));
                    }));
                }
            }
        ));
    }

    private navigateToLogin() {
        return this.router.navigate(["account/login"]);
    }

    private refresh() {
        return this.refreshTokenService.refresh().pipe(tap(res => this.authService.addUserToLocalStorage(res as User)));
    }

    private updateAuthHeader(request) {
        const jwtToken = this.authService.currentUserValue.jwtToken;
        request = request.clone({
            headers: request.headers.set("Authorization", `Bearer ${jwtToken}`)
        });
        return request;
    }
}