import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { AppConfigService } from '../services/app-config.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RefreshTokenService } from '../services/refresh-token.service';
import { User } from '../models/user.model';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private refreshTokenEndpoint = AppConfigService.settings.apiEndpoints.refreshToken;

    constructor(private refreshTokenService: RefreshTokenService, private router: Router, private authService: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        return next.handle(request).pipe(tap(() => {},                
                error => {
                    if (error instanceof HttpErrorResponse || error.status !== HttpStatusCodes.UNAUTHORIZED) {
                        return;
                    }
                    this.authService.redirectUrl = this.router.url;
                    if (request.url.endsWith(this.refreshTokenEndpoint)) {
                        this.navigateToLogin();
                    }
                    else {
                        this.refreshTokenService.refresh().subscribe(res => this.authService.addUserToLocalStorage(res as User));
                    }
                }
            )
        );
    }

    private navigateToLogin(){
        return this.router.navigate(["account/login"]);
    }
}