import { Injectable } from '@angular/core';
import { AppConfigService } from './app-config.service';
import { RepositoryService } from './repository.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    private registerEndpoint = AppConfigService.settings.apiEndpoints.register;
    private loginEndpoint = AppConfigService.settings.apiEndpoints.login;
    private currentUserSubject: BehaviorSubject<User>;
    private currentUser: Observable<User>;

    constructor(private repository: RepositoryService) { 
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    public register(body: any) {
        return this.repository.post(this.registerEndpoint, body);
    }
}
