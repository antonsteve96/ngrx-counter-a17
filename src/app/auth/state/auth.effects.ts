import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {loginFailure, loginStart, loginSuccess} from "./auth.actions";
import {catchError, exhaustMap, map, of, tap} from "rxjs";
import {AuthResponse} from "../../models/auth-response.model";


@Injectable()
export class AuthEffects {

  login$ = createEffect(() => {
    return this.actions$?.pipe(
      ofType(loginStart),
      tap(action => console.log('Effetto login innescato', action)),
      exhaustMap((action) =>
        this.authService.login(action.email, action.password).pipe(
          map((authResponse: AuthResponse) => {
            console.log(authResponse)
            this.router.navigate(['home']).then()
            return loginSuccess()
          }),
          catchError(() => of(loginFailure()))
        )
      )
    );
  });

  constructor(private actions$: Actions, private authService: AuthService, private router: Router) {
  }

}
