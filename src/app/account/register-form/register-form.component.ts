import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { CustomValidators } from './../../shared/utils/custom-validators';

@Component({
    selector: 'app-register-form',
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

    private registerForm: FormGroup;
    submitted = false;

    constructor(private builder: FormBuilder) { }

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
        this.submitted = true;
        console.log(this.f.password.errors);
    }

}
