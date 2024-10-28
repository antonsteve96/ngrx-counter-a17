import {Component, inject, OnInit, effect} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/components/header/header.component";
import { NgIf } from "@angular/common";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { SnackbarService } from "./services/snackbar.service";
import {AuthStore} from "./auth/state/auth.state";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    MatProgressSpinnerModule,
    NgIf,
    MatSnackBarModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  authStore = inject(AuthStore);
  private snackbarService = inject(SnackbarService);
  isLoading = this.authStore.loadingSignal();


  constructor() {
    effect(() => {
      const errorMessage = this.authStore.getErrorMessage();
      if (errorMessage && errorMessage !== "") {
        this.snackbarService.openSnackbar(errorMessage);
      }
    });
  }

  ngOnInit() {
    this.authStore.autoLogin();
  }

}
