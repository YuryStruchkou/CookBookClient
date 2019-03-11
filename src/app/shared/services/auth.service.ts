import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUserSubject: BehaviorSubject<User>;
    private currentUser: Observable<User>;
    private static readonly CURRENT_USER_KEY = 'currentUser';

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    constructor() {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem(AuthService.CURRENT_USER_KEY)));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public addUserToLocalStorage(user: User) {
        localStorage.setItem(AuthService.CURRENT_USER_KEY, JSON.stringify(user));
        this.currentUserSubject.next(user);
    }

    public logout() {
        localStorage.removeItem(AuthService.CURRENT_USER_KEY);
        this.currentUserSubject.next(null);
    }
}
