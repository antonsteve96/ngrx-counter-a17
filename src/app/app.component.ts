import { Component, inject, OnDestroy, OnInit, Signal, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from "@ngrx/store";
import { HeaderComponent } from "./shared/components/header/header.component";
import { getErrorMessage, getLoadingSpinner } from "./store/shared/shared.selectors";
import { filter } from "rxjs";
import { NgIf } from "@angular/common";
import { RootState } from "./store/root.state";
import { autoLogin } from "./auth/state/auth.actions";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { SnackbarService } from "./services/snackbar.service";
import { toSignal } from "@angular/core/rxjs-interop";

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
export class AppComponent implements OnInit, OnDestroy {
  private sharedStore = inject(Store<RootState>);
  private authStore = inject(Store<RootState>);
  private snackbarService = inject(SnackbarService);

  showLoadingSpinner: Signal<boolean> = toSignal(this.sharedStore.select(getLoadingSpinner), {initialValue: false});
  errorMessage: Signal<string> = toSignal(this.sharedStore.select(getErrorMessage), { initialValue: '' });

  constructor() {
    effect(() => {
      const errorMessage = this.errorMessage();
      if (errorMessage) {
        this.snackbarService.openSnackbar(errorMessage);
      }
    });
  }

  ngOnInit(): void {
    this.authStore.dispatch(autoLogin());
  }

  ngOnDestroy() {
    // Nessuna subscription manuale da cancellare, tutto è gestito dai signals
  }
}
