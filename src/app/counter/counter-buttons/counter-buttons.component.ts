import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {changeSiteName, decrement, increment, reset} from "../state/counter.actions";
import {AppState} from "../../store/app.state";

@Component({
  selector: 'app-counter-buttons',
  standalone: true,
  imports: [],
  templateUrl: './counter-buttons.component.html',
  styleUrl: './counter-buttons.component.scss'
})
export class CounterButtonsComponent {

  constructor(private counterStore: Store<AppState>) {
  }

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
