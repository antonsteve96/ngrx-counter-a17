import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { NgIf, AsyncPipe } from "@angular/common";
import { MatToolbar } from "@angular/material/toolbar";
import { MatButton } from "@angular/material/button";
import {AuthStore} from "../../../auth/state/auth.state";

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
  authStore = inject(AuthStore);
  //private postsStore = inject(Store<AppState>);

  onLogout(event: Event) {
    event.preventDefault();
    //this.postsStore.dispatch(resetPosts());
    this.authStore.logout().then()
  }
}
