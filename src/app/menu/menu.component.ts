import { Component, OnInit } from '@angular/core';
import { AuthService } from './../shared/services/auth.service';
import { User } from './../shared/models/user.model';
import { AccountService } from '../shared/services/account.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
    private searchForm: FormGroup;
    private currentUser: User;
    private adminRole = Roles.ADMIN;

    constructor(private router: Router, 
        private builder: FormBuilder, 
        private authService: AuthService,
        private accountService: AccountService) {
        this.searchForm = this.builder.group({
            query: ['']
        });
        this.authService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
     }

    ngOnInit() {
    }

    onSubmit(event: any) {
        const query = this.searchForm.controls.query.value;
        this.router.navigate(['/search'], { queryParams: { query: query } });
    }
}
