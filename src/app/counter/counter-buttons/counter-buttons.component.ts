import {Component, inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {CounterStore} from "../state/counter.state";

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

  readonly counterStore = inject(CounterStore)

  onIncrement() {
    this.counterStore.increment();
  }

  onDecrement() {
    this.counterStore.decrement();
  }

  onReset() {
    this.counterStore.reset();
  }

  onChangeChannelName() {
    this.counterStore.changeSiteName();
  }

}
