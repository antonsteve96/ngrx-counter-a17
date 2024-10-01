import {inject, Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {autoLogin, autoLogout, loginStart, loginSuccess, signupStart, signupSuccess} from "./auth.actions";
import {asyncScheduler, catchError, EMPTY, filter, map, scheduled, switchMap, tap} from "rxjs";
import {AuthResponse} from "../../models/auth-response.model";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.state";
import {setErrorMessage, setLoadingSpinner} from "../../store/shared/shared.actions";
import {SharedService} from "../../services/shared.service";


@Injectable()
export class AuthEffects {

  private actions$ = inject(Actions)
  private authService = inject(AuthService)
  private router = inject(Router)
  private sharedStore = inject(Store<AppState>)
  private sharedService = inject(SharedService)

  login$ = createEffect(() => {
    return this.actions$?.pipe(
      ofType(loginStart),
      switchMap((action) =>
        this.authService.login(action.email, action.password).pipe(
          map((authResponse: AuthResponse) => {
            this.sharedStore.dispatch(setLoadingSpinner({status: false}))
            this.authService.setTokenInLocalStorage(authResponse.token)
            return loginSuccess({token: authResponse.token, redirect: true})
          }),
          catchError((error) => {
            this.sharedStore.dispatch(setLoadingSpinner({status: false}))
            const errorMessage = this.sharedService.getErrorCode(error.status)
            return scheduled([setErrorMessage({ message: errorMessage })], asyncScheduler);
          })
        )
      )
    );
  });

  redirect$ = createEffect(() => this.actions$.pipe(
    ofType(...[loginSuccess, signupSuccess]),
    filter((action) => action.redirect),
    tap(() => this.router.navigate(['']))
  ), {dispatch: false})

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signupStart),
      switchMap((action) => this.authService.signup(action.registrationRequest).pipe(
        map(() => {
          this.sharedStore.dispatch(setLoadingSpinner({status: false}))
          return signupSuccess({redirect: true})
        }),
        catchError((error) => {
          this.sharedStore.dispatch(setLoadingSpinner({status: false}))
          const errorMessage = this.sharedService.getErrorCode(error.status);
          return scheduled([setErrorMessage({ message: errorMessage })], asyncScheduler);
        })
      ))
    )
  )

  autoLogin$ = createEffect(() => this.actions$.pipe(
    ofType(autoLogin),
    switchMap(() => {
      const token = this.authService.getTokenFromLocalStorage();
      if (token) {
        return scheduled([loginSuccess({token: token, redirect: false})], asyncScheduler);
      } else {
        return EMPTY;
      }
    })
  ))


  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(autoLogout),
      map(() => {
        this.authService.logout();
        this.router.navigate(['']).then(() => {
          console.log('Navigazione completata');
        });
      })
    ), {dispatch: false}
  )
}
