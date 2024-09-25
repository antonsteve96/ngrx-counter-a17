import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { counterReducer } from "./counter/state/counter.reducer";
import {Store, StoreModule} from "@ngrx/store";
import { CounterComponent } from "./counter/counter/counter.component";
import {HeaderComponent} from "./shared/components/header/header.component";
import {LoadingSpinnerComponent} from "./shared/components/loading-spinner/loading-spinner.component";
import {getErrorMessage, getLoadingSpinner, SHARED_STATE} from "./store/shared/shared.selectors";
import {AppState} from "./store/app.state";
import {Observable} from "rxjs";
import {AsyncPipe, NgIf} from "@angular/common";
import {RootState} from "./store/root.state";
import {autoLogin} from "./auth/state/auth.actions";
import {isAuthenticated} from "./auth/state/auth.selectors";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CounterComponent,
    HeaderComponent,
    LoadingSpinnerComponent,
    NgIf,
    AsyncPipe,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // Corretto con "styleUrls"
})
export class AppComponent {
  private sharedStore = inject(Store<RootState>);
  private authStore = inject(Store<RootState>);
  showLoadingSpinner$: Observable<boolean> = this.sharedStore.select(getLoadingSpinner);
  errorMessage$: Observable<string> = this.sharedStore.select(getErrorMessage);


  ngOnInit(): void {
    this.authStore.dispatch(autoLogin())
    this.authStore.select(isAuthenticated).subscribe((data) => console.log(data))
  }

}
