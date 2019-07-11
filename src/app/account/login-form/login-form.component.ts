import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from './../../shared/services/account.service';
import { AuthService } from './../../shared/services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from './../../shared/models/user.model';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

    private loginForm: FormGroup;

    private errorText: string;

    constructor(private builder: FormBuilder, 
         private router: Router, 
         private authService: AuthService, 
         private accountService: AccountService) {
        if (authService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.builder.group({
            userName: ['', []],
            password: ['', []]
        });
    }

    onSubmit() {
        let model = { UserNameOrEmail: this.loginForm.controls.userName.value, Password: this.loginForm.controls.password.value };
        this.accountService.login(model).subscribe (res => { 
            this.authService.addUserToLocalStorage(res as User);
            this.router.navigate(['/']);
        }, errors => {
            this.errorText = errors.error.errors[0];
        })
    }
}
