import { FormControl, ValidatorFn, AbstractControl } from '@angular/forms'

export class CustomValidators {
    public static isValidPassword(passwordControl: FormControl): { invalid: boolean } {
        let password = passwordControl.value;
        if (password.length < 6 || password.search(/\d/) == -1 || password.search(/[a-z]/) == -1 ||
                password.search(/[A-Z]/) == -1 || password.search(/[^a-zA-Z0-9]/) == -1)
            return { invalid: true }
    }

    public static passwordMismatch(passwordControl: AbstractControl): ValidatorFn {
        return confirmPasswordControl => {
            let password = passwordControl.value;
            let confirmPassword = confirmPasswordControl.value;
            return password !== confirmPassword ? { mismatch: true } : null;
        }
    }
}