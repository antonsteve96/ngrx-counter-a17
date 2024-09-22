// src/app/validators/custom-email.validator.ts
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function customEmailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const email = control.value;
    // Definisci il pattern per le email che desideri validare
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;


    // Verifica se l'email rispetta il pattern
    if (email && !emailPattern.test(email)) {
      return { invalidEmail: true }; // Errore di validazione
    }

    return null; // Valido
  };
}

// src/app/validators/custom-password.validator.ts

export function customPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.value;

    // Criteri di validazione
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const isValid = password &&
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialCharacter;

    if (!isValid) {
      return {
        invalidPassword: {
          minLength: minLength,
          hasUpperCase: hasUpperCase,
          hasLowerCase: hasLowerCase,
          hasNumber: hasNumber,
          hasSpecialCharacter: hasSpecialCharacter
        }
      };
    }
    return null; // Password valida
  };
}
