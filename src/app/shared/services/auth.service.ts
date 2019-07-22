import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public currentUser: BehaviorSubject<User>;
    private static readonly CURRENT_USER_KEY = 'currentUser';

    constructor() {
        this.currentUser = new BehaviorSubject<User>(JSON.parse(localStorage.getItem(AuthService.CURRENT_USER_KEY)));
    }

    public get isLoggedIn() {
        const userSaved = this.currentUserValue && new Date(this.currentUserValue.expiryDate).getTime() > new Date().getTime(); 
        return userSaved;
    }

    public get currentUserValue() {
        return this.currentUser.value;
    }

    public addUserToLocalStorage(user: User) {
        localStorage.setItem(AuthService.CURRENT_USER_KEY, JSON.stringify(user));
        this.currentUser.next(user);
    }

    public logout() {
        localStorage.removeItem(AuthService.CURRENT_USER_KEY);
        this.currentUser.next(null);
    }
}
