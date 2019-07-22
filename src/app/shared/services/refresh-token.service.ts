import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { RepositoryService } from './repository.service';
import { AuthService } from './auth.service';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root'
})
export class RefreshTokenService {
    private refreshTokenEndpoint = AppConfigService.settings.apiEndpoints.refreshToken;
    private currentUser: User;

    constructor(private repository: RepositoryService, private authService: AuthService) {
        this.authService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    refresh() {
        return this.repository.post(this.refreshTokenEndpoint, { UserName: this.currentUser.userName }, true);
    }
}
