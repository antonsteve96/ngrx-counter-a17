import {Component, inject} from '@angular/core';
import {RouterLink} from "@angular/router";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/app.state";
import {Observable} from "rxjs";
import {isAuthenticated} from "../../../auth/state/auth.selectors";
import {AsyncPipe, NgIf} from "@angular/common";
import {RootState} from "../../../store/root.state";

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
  isAuthenticated$: Observable<boolean> = this.authStore.select(isAuthenticated);


  ngOnInit() {
    this.isAuthenticated$.subscribe((data) => console.log(data))
  }
}
