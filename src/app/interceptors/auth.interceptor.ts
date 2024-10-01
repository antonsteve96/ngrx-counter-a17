import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService); // Iniezione del servizio di autenticazione

  // Recupera il token dall'AuthService
  const token = authService.getTokenFromLocalStorage();

  if (token && token.length > 0) {
    // Clona la richiesta e aggiungi l'header di autorizzazione se il token è presente
    const modifiedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    // Passa la richiesta modificata al prossimo handler nella catena
    return next(modifiedReq);
  } else {
    // Se non c'è il token, restituisci la richiesta non modificata
    return next(req);
  }
};
