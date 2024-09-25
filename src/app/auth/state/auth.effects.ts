import {inject, Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {autoLogin, loginStart, loginSuccess, signupStart, signupSuccess} from "./auth.actions";
import {catchError, map, of, switchMap, tap} from "rxjs";
import {AuthResponse} from "../../models/auth-response.model";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.state";
import {setErrorMessage, setLoadingSpinner} from "../../store/shared/shared.actions";


@Injectable()
export class AuthEffects {

  private actions$ = inject(Actions)
  private authService = inject(AuthService)
  private router = inject(Router)
  private sharedState = inject(Store<AppState>)

  login$ = createEffect(() => {
    return this.actions$?.pipe(
      ofType(loginStart),
      switchMap((action) =>
        this.authService.login(action.email, action.password).pipe(
          map((authResponse: AuthResponse) => {
            this.sharedState.dispatch(setLoadingSpinner({status: false}))
            this.authService.setTokenInLocalStorage(authResponse.token)
            return loginSuccess({token: authResponse.token})
          }),
            catchError((error) => {
              this.sharedState.dispatch(setLoadingSpinner({ status: false}))
              const errorMessage = this.authService.getErrorCode(error.status)
              return of(setErrorMessage({message: errorMessage}))
            })
        )
      )
    );
  });

  redirect$ = createEffect(() => this.actions$.pipe(
    ofType(...[loginSuccess, signupSuccess]),
    tap(() => this.router.navigate(['']))
  )
  , {dispatch: false})

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signupStart),
      switchMap((action) => this.authService.signup(action.registrationRequest).pipe(
        map(() => {
          this.sharedState.dispatch(setLoadingSpinner({status: false}))
          return signupSuccess()
        }),
        catchError((error) => {
          this.sharedState.dispatch(setLoadingSpinner({ status: false}))
          const errorMessage = this.authService.getErrorCode(error.status)
          return of(setErrorMessage({message: errorMessage}))
        })
      ))
    )
  )

  autoLogin$ = createEffect(() => this.actions$.pipe(
    ofType(autoLogin),
    map(() => {
      const token = this.authService.getTokenFromLocalStorage();
      if (token) {
        console.log("Login success")
        return loginSuccess({ token: token });
      } else {
        return setErrorMessage({ message: 'Nessun token trovato' });
      }
    }
  )),{dispatch: false})

}
