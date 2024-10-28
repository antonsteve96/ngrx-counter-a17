import { Component, inject, signal } from '@angular/core';
import { CodeInputModule } from "angular-code-input";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { NgIf } from "@angular/common";
import {asyncScheduler, catchError, firstValueFrom, scheduled, tap} from "rxjs";

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
  message = signal<string>('');
  isOkay = signal<boolean>(true);
  submitted = signal<boolean>(false);

  private router = inject(Router);
  private authService = inject(AuthService);

  onCodeCompleted(token: string) {
    this.confirmAccount(token).then();
  }

  redirectToLogin() {
    this.router.navigate(['login']).then();
  }

  async confirmAccount(token: string): Promise<void> {
      try {
        await this.authService.confirmAccount(token);
        this.message.set('Il suo account è stato attivato con successo.\nOra puoi procedere al login');
        this.submitted.set(true);
      } catch (error) {
        this.message.set('Token è scaduto o invalido');
        this.submitted.set(true);
        this.isOkay.set(false);
      }
  }
}
