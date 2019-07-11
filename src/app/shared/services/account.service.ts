import { Injectable } from '@angular/core';
import { AppConfigService } from './app-config.service';
import { RepositoryService } from './repository.service';


@Injectable({
    providedIn: 'root'
})
export class AccountService {
    private registerEndpoint = AppConfigService.settings.apiEndpoints.register;
    private loginEndpoint = AppConfigService.settings.apiEndpoints.login;
    
    constructor(private repository: RepositoryService) { }

    public register(body: any) {
        return this.repository.post(this.registerEndpoint, body);
    }

    public login(body: any) {
        return this.repository.post(this.loginEndpoint, body);
    }
}
