import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomValidators } from './../../shared/utils/custom-validators';
import { AccountService } from './../../shared/services/account.service';
import { AuthService } from './../../shared/services/auth.service';
import { RegisterResponse } from './../../shared/models/register-response.model';
import { ImageUploadComponent } from 'src/app/common-components/image-upload/image-upload.component';

@Component({
    selector: 'app-register-form',
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

    @ViewChild(ImageUploadComponent, { static: false }) imageUploadComponent: ImageUploadComponent;

    private registerForm: FormGroup;

    private errorText: string;

    constructor(private builder: FormBuilder,
        private router: Router,
        private toastr: ToastrService,
        private accountService: AccountService,
        authService: AuthService) {
        if (authService.isLoggedIn) {
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
        this.imageUploadComponent.submit();
    }

    sendRequest(publicId: string) {
        let model = {
            UserName: this.registerForm.controls.userName.value,
            Email: this.registerForm.controls.email.value,
            Password: this.registerForm.controls.password.value,
            ConfirmPassword: this.registerForm.controls.confirmPassword.value,
            ImagePublicId: publicId
        };
        this.accountService.register(model).subscribe({
            next: this.handleSuccessfulRegistration.bind(this),
            error: this.handleError.bind(this)
        });
    }

    private handleSuccessfulRegistration(res: Object) {
        let response = res as RegisterResponse;
        this.toastr.success(`The confirmation email was sent to your email address ${response.email}.`, 'Registration successful.');
        this.router.navigate(['/account/login']);
    }

    private handleError(errors: any) {
        this.errorText = errors.error.errors[0];
    }
}
