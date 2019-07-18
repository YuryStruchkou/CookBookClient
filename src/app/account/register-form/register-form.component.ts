import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomValidators } from './../../shared/utils/custom-validators';
import { AccountService } from './../../shared/services/account.service';
import { AuthService } from './../../shared/services/auth.service';
import { RegisterResponse } from './../../shared/models/register-response.model';

@Component({
    selector: 'app-register-form',
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

    private registerForm: FormGroup;

    private errorText: string;

    constructor(private builder: FormBuilder,
        private router: Router,
        private toastr: ToastrService,
        private accountService: AccountService,
        authService: AuthService) {
        if (authService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.registerForm = this.builder.group({
            userName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, CustomValidators.isValidPassword]]
        });
        this.registerForm.addControl('confirmPassword',
            new FormControl('', [CustomValidators.passwordMismatch(this.registerForm.controls.password)]));
    }

    private get f() { return this.registerForm.controls; }

    onSubmit() {
        let model = {
            UserName: this.registerForm.controls.userName.value, email: this.registerForm.controls.email.value,
            Password: this.registerForm.controls.password.value, ConfirmPassword: this.registerForm.controls.confirmPassword.value
        };
        this.accountService.register(model).subscribe(res => {
            this.handleSuccessfulRegistration(res as RegisterResponse);
        }, errors => {
            this.errorText = errors.error.errors[0];
        });
    }

    handleSuccessfulRegistration(response: RegisterResponse) {
        this.toastr.success(`The confirmation email was sent to your email address ${response.email}.`, 'Registration successful.');
        this.router.navigate(['/account/login']);
    }
}
