import { Injectable } from '@angular/core';
import { AppConfigService } from './app-config.service';
import { RepositoryService } from './repository.service';
import { AuthService } from './auth.service';
import { throwError } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class AccountService {
    private registerEndpoint = AppConfigService.settings.apiEndpoints.register;
    private loginEndpoint = AppConfigService.settings.apiEndpoints.login;
    private refreshTokenEndpoint = AppConfigService.settings.apiEndpoints.refreshToken;
    private logoutEndpoint = AppConfigService.settings.apiEndpoints.logout;

    constructor(private repository: RepositoryService, private authService: AuthService) { }

    public register(body: any) {
        return this.repository.post(this.registerEndpoint, body);
    }

    public login(body: any) {
        return this.repository.post(this.loginEndpoint, body, { withCredentials: true });
    }

    public refresh() {
        if (this.authService.currentUserValue == null) {
            return throwError('User not set.');
        }
        return this.repository.post(this.refreshTokenEndpoint, { UserName: this.authService.currentUserValue.userName }, { withCredentials: true });
    }

    public logout() {
        if (this.authService.currentUserValue == null) {
            return throwError('User not set.');
        }
        this.repository.post(this.logoutEndpoint, { UserName: this.authService.currentUserValue.userName }, { withCredentials: true }).subscribe(res => {
            this.authService.logout();
        });
    }
}
