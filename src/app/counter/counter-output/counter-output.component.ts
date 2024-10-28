import {Component, inject} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {CounterStore} from "../state/counter.state";

@Component({
  selector: 'app-counter-output',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './counter-output.component.html',
  styleUrl: './counter-output.component.scss'
})
export class CounterOutputComponent {

  readonly counterStore = inject(CounterStore);

}
