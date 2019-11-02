import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public currentUser: BehaviorSubject<User>;
    public redirectUrl: string;
    private static readonly CURRENT_USER_KEY = 'currentUser';

    constructor(private router: Router) {
        this.currentUser = new BehaviorSubject<User>(JSON.parse(localStorage.getItem(AuthService.CURRENT_USER_KEY)));
    }

    public get isLoggedIn() {
        let user = this.currentUserValue;
        const userSaved = user && new Date(user.expiryDate).getTime() > new Date().getTime(); 
        return userSaved;
    }

    public get currentUserValue() {
        const user = JSON.parse(localStorage.getItem(AuthService.CURRENT_USER_KEY));
        this.currentUser.next(user);
        return this.currentUser.value;
    }

    public addUserToLocalStorage(user: User) {
        localStorage.setItem(AuthService.CURRENT_USER_KEY, JSON.stringify(user));
        this.currentUser.next(user);
        if (this.redirectUrl) {
            this.router.navigate([this.redirectUrl]);
            this.redirectUrl = null;
        }
    }

    public logout() {
        localStorage.removeItem(AuthService.CURRENT_USER_KEY);
        this.currentUser.next(null);
    }
}
