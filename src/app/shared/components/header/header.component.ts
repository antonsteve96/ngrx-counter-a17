import {Component, inject} from '@angular/core';
import {RouterLink} from "@angular/router";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {isAuthenticated} from "../../../auth/state/auth.selectors";
import {AsyncPipe, NgIf} from "@angular/common";
import {RootState} from "../../../store/root.state";
import {autoLogout} from "../../../auth/state/auth.actions";
import {AppState} from "../../../store/app.state";
import {resetPosts} from "../../../posts/state/posts.actions";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private authStore = inject(Store<RootState>)
  private postsStore = inject(Store<AppState>)
  isAuthenticated$: Observable<boolean> = this.authStore.select(isAuthenticated);


  onLogout(event: Event) {
    event.preventDefault()
    this.postsStore.dispatch(resetPosts())
    this.authStore.dispatch(autoLogout())
  }
}
