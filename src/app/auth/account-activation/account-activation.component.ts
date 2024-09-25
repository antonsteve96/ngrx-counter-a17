import {Component, inject} from '@angular/core';
import {CodeInputModule} from "angular-code-input";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {NgIf} from "@angular/common";
import {catchError, of, tap} from "rxjs";

@Component({
  selector: 'app-account-activation',
  standalone: true,
  imports: [
    CodeInputModule,
    NgIf
  ],
  templateUrl: './account-activation.component.html',
  styleUrl: './account-activation.component.scss'
})
export class AccountActivationComponent {
  message = '';
  isOkay = true;
  submitted = false;

  private router = inject(Router)
  private authService = inject(AuthService)

  onCodeCompleted(token: string) {
    this.confirmAccount(token);
  }

  redirectToLogin() {
    this.router.navigate(['login']).then()
  }

  private confirmAccount(token: string): void {
    this.authService.confirmAccount(token).pipe(
      tap(() => {
        this.message = 'Il suo account è stato attivato con successo.\nOra puoi procedere al login';
        this.submitted = true;
      }),
      catchError(() => {
        this.message = 'Token è scaduto o invalido';
        this.submitted = true;
        this.isOkay = false;
        return of()
      })
    ).subscribe();
  }

}
