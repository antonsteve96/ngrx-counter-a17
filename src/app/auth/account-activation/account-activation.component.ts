import { Component, inject, signal, effect } from '@angular/core';
import { CodeInputModule } from "angular-code-input";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { NgIf } from "@angular/common";
import { asyncScheduler, catchError, scheduled, tap } from "rxjs";

@Component({
  selector: 'app-account-activation',
  standalone: true,
  imports: [
    CodeInputModule,
    NgIf
  ],
  templateUrl: './account-activation.component.html',
  styleUrls: ['./account-activation.component.scss']
})
export class AccountActivationComponent {
  message = signal('');
  isOkay = signal(true);
  submitted = signal(false);

  private router = inject(Router);
  private authService = inject(AuthService);

  onCodeCompleted(token: string) {
    this.confirmAccount(token);
  }

  redirectToLogin() {
    this.router.navigate(['login']).then();
  }

  private confirmAccount(token: string): void {
    this.authService.confirmAccount(token).pipe(
      tap(() => {
        this.message.set('Il suo account è stato attivato con successo.\nOra puoi procedere al login');
        this.submitted.set(true);
      }),
      catchError(() => {
        this.message.set('Token è scaduto o invalido');
        this.submitted.set(true);
        this.isOkay.set(false);
        return scheduled([], asyncScheduler);
      })
    ).subscribe();
  }
}
