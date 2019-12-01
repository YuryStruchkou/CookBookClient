import { Injectable } from '@angular/core';
import { AppConfigService } from './app-config.service';
import { RepositoryService } from './repository.service';

@Injectable({
    providedIn: 'root'
})
export class UserProfileService {
    private userProfileEndpoint = AppConfigService.settings.apiEndpoints.userProfile;
    private muteSuffix = AppConfigService.settings.apiEndpoints.muteSuffix;
    private blockSuffix = AppConfigService.settings.apiEndpoints.blockSuffix;
    private restoreSuffix = AppConfigService.settings.apiEndpoints.restoreSuffix;

    constructor(private repository: RepositoryService) { }

    public getUserProfile(id: number) {
        return this.repository.get(this.userProfileEndpoint + id);
    }

    public getAllUsers() {
        return this.repository.get(this.userProfileEndpoint);
    }

    public blockUser(id: number) {
        return this.repository.patch(this.userProfileEndpoint + id + this.blockSuffix, null);
    }

    public muteUser(id: number) {
        return this.repository.patch(this.userProfileEndpoint + id + this.muteSuffix, null);
    }

    public restoreUser(id: number) {
        return this.repository.patch(this.userProfileEndpoint + id + this.restoreSuffix, null);
    }

    public markUserAsDeleted(id: number) {
        return this.repository.delete(this.userProfileEndpoint + id);
    }
}
