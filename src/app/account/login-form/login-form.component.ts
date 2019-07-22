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
        if (authService.isLoggedIn) {
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
        this.accountService.login(model).subscribe({
            next: this.handleSuccessfulLogin.bind(this),
            error: this.handleError.bind(this)
        });
    }

    private handleSuccessfulLogin(res: Object) {
        this.authService.addUserToLocalStorage(res as User);
        this.router.navigate(['/']);
    }

    private handleError(errors: any) {
        this.errorText = errors.error.errors[0];
    }
}
