import { Component, inject, Signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Store } from "@ngrx/store";
import { isAuthenticated } from "../../../auth/state/auth.selectors";
import { NgIf, AsyncPipe } from "@angular/common";
import { RootState } from "../../../store/root.state";
import { autoLogout } from "../../../auth/state/auth.actions";
import { AppState } from "../../../store/app.state";
import { resetPosts } from "../../../posts/state/posts.actions";
import { MatToolbar } from "@angular/material/toolbar";
import { MatButton } from "@angular/material/button";
import {toSignal} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    AsyncPipe,
    MatToolbar,
    MatButton
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private authStore = inject(Store<RootState>);
  private postsStore = inject(Store<AppState>);

  isAuthenticated: Signal<boolean> = toSignal(
    this.authStore.select(isAuthenticated),
    { initialValue: false }
  );

  onLogout(event: Event) {
    event.preventDefault();
    this.postsStore.dispatch(resetPosts());
    this.authStore.dispatch(autoLogout());
  }
}
