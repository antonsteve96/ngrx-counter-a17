import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const postsGuard: CanActivateFn = () => {
  const router = inject(Router); // Iniezione del router

  // Verifica se siamo nel contesto del browser
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    const token = localStorage.getItem('token');

    if (token) {
      return true; // Se il token esiste, permette l'accesso
    } else {
      router.navigate(['/login']).then(); // Reindirizza alla pagina di login se non autenticato
      return false;
    }
  }

  // Se siamo in un contesto server-side o localStorage non è disponibile, blocca l'accesso
  return false;
};
