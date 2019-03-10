import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { CustomValidators } from './../../shared/utils/custom-validators';
import { AccountService } from './../../shared/services/account.service';

@Component({
    selector: 'app-register-form',
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

    private registerForm: FormGroup;

    private errorText: string;

    constructor(private builder: FormBuilder, private accountService: AccountService) { }

    ngOnInit() {
        this.registerForm = this.builder.group({
            userName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, CustomValidators.isValidPassword]]
        });
        this.registerForm.addControl('confirmPassword', 
            new FormControl('', [CustomValidators.passwordMismatch(this.registerForm.controls.password)]));
    }

    get f() { return this.registerForm.controls; }

    onSubmit() {
        let model = { UserName: this.f.userName.value, email: this.f.email.value, 
            Password: this.f.password.value, ConfirmPassword: this.f.confirmPassword.value };
        this.accountService.register(model).subscribe(res => {
            console.log(res);
            this.errorText = "";
        }, errors => {
            this.errorText = errors.error.errors[0];
        });
    }
}
