import { Component, OnInit } from '@angular/core';
import { AuthService } from './../shared/services/auth.service';
import { User } from './../shared/models/user.model';
import { AccountService } from '../shared/services/account.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

    private currentUser: User;

    constructor(private authService: AuthService, private accountService: AccountService) {
        this.authService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
     }

    ngOnInit() {
    }

}
