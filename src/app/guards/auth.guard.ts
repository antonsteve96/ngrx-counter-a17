import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router); // Iniezione del router

  // Verifica se siamo nel contesto del browser
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    const token = localStorage.getItem('token');

    if (token == null || token == "") {
      return true; // Se il token esiste e non è vuoto, permette l'accesso
    } else {
      router.navigate(['/']).then(); // Reindirizza alla pagina di login se non autenticato
      return false;
    }
  }

  // Se siamo nel contesto server-side o localStorage non esiste, impedisci l'accesso
  return false;
};
