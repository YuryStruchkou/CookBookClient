import { Injectable } from '@angular/core';
import { AppConfigService } from './app-config.service';
import { RepositoryService } from './repository.service';

@Injectable({
    providedIn: 'root'
})
export class UserProfileService {
    private userProfileEndpoint = AppConfigService.settings.apiEndpoints.userProfile;

    constructor(private repository: RepositoryService) { }

    public getUserProfile(id: number) {
        return this.repository.get(this.userProfileEndpoint + id);
    }
}
