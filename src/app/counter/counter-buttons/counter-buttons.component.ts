import {Component, inject} from '@angular/core';
import {Store} from "@ngrx/store";
import {changeSiteName, decrement, increment, reset} from "../state/counter.actions";
import {AppState} from "../../store/app.state";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-counter-buttons',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './counter-buttons.component.html',
  styleUrl: './counter-buttons.component.scss'
})
export class CounterButtonsComponent {

  private counterStore = inject(Store<AppState>)

  onIncrement() {
    this.counterStore.dispatch(increment());
  }

  onDecrement() {
    this.counterStore.dispatch(decrement());
  }

  onReset() {
    this.counterStore.dispatch(reset());
  }

  onChangeChannelName() {
    this.counterStore.dispatch(changeSiteName());
  }
}
