import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

/**
PASSWORD REQUIREMENTS:
- At least 14 characters long
- Contains at least one lowercase letter ((?=.*[a-z]))
- Contains at least one uppercase letter ((?=.*[A-Z]))
- Contains at least one digit ((?=.*\d))
- Contains at least one special character from the set @$!%*?& ((?=.*[@$!%*?&]))
- Allows characters from the following character set: uppercase letters (A-Z), lowercase letters (a-z), digits (0-9),
and the special characters @$!%*?&
*/
export const PASSWORD_REGEX: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{14,}$/;
export const PASSWORD_REQUIREMENTS: string = "Password needs to be at least 14 characters long and " +
  "be a combination of uppercase letters, lowercase letters, numbers, and symbols: @$!%*?& ."
export const EMAIL_PATTERN_EXTENDED: RegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const EMAIL_PATTERN_TO_STRING: string = "^[a-zA-Z0-9.!#$%&'*+\\/=?^_`\\{\\|\\}~\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}$";
export const LETTERS_ONLY: RegExp = /^[A-Za-z]+$/;
export const PHONE_REGEX: RegExp = /^\d{9}$/;

export function passwordValidator(): ValidatorFn {
  return (passwordControl: AbstractControl): ValidationErrors | null => {
    let validPassword: boolean = PASSWORD_REGEX.test(passwordControl.value);
    return !validPassword ? {password: {value: passwordControl.value}} : null;
  }
}

export function confirmPasswordValidator(passwordControl: AbstractControl): ValidatorFn {
  return (confirmPasswordControl: AbstractControl): ValidationErrors | null => {
    let validConfirmPassword: boolean = passwordControl.value === confirmPasswordControl.value;
    return !validConfirmPassword ? {confirmPassword: {value: confirmPasswordControl.value}} : null;
  }
}

export function maxAgeValidator(minAgeControl: AbstractControl): ValidatorFn {
  return (maxAgeControl: AbstractControl): ValidationErrors | null => {
    if (maxAgeControl.value === '') return null;
    let validMaxAge: boolean = +minAgeControl.value < +maxAgeControl.value;
    return !validMaxAge ? {maxAge: {value: maxAgeControl.value}} : null;
  }
}
