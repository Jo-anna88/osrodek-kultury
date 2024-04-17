import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

/**
PASSWORD REQUIREMENTS:
- At least 8 characters long
- Contains at least one lowercase letter ((?=.*[a-z]))
- Contains at least one uppercase letter ((?=.*[A-Z]))
- Contains at least one digit ((?=.*\d))
- Contains at least one special character from the set @$!%*?& ((?=.*[@$!%*?&]))
- Allows characters from the following character set: uppercase letters (A-Z), lowercase letters (a-z), digits (0-9),
and the special characters @$!%*?&
*/
export const PASSWORD_REGEX: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const PASSWORD_REQUIREMENTS: string = "Password needs to be at least 8 characters long and " +
  "be a combination of uppercase letters, lowercase letters, numbers, and symbols: @$!%*?& ."
export const LETTERS_ONLY: RegExp = /^[A-Za-z]+$/;
export const PHONE_REGEX: RegExp = /^\d{9}$/;

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let validPassword: boolean = PASSWORD_REGEX.test(control.value);
    return !validPassword ? {password: {value: control.value}} : null;
  }
}

export function confirmPasswordValidator(passwordControl: AbstractControl): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let validConfirmPassword: boolean = passwordControl.value === control.value;
    return !validConfirmPassword ? {confirmPassword: {value: control.value}} : null;
  }
}
