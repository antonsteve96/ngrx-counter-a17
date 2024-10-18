import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);
  const token = authService.getTokenFromLocalStorage();  // Usa il segnale del token

  if (token && token.length > 0) {
    const modifiedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(modifiedReq);
  } else {
    return next(req);
  }
};
