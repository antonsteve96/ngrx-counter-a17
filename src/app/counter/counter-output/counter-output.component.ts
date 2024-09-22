import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {map, Observable, Subscription} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {getCounter} from "../state/counter.selectors";
import {AppState} from "../../store/app.state";

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

  counter: number = 0;
  counterSubscription: Subscription = new Subscription();

  constructor(private counterStore: Store<AppState>) {
  }

  ngOnInit(): void {
    this.counterSubscription = this.counterStore.select(getCounter).subscribe((counter) => this.counter = counter)
  }

  ngOnDestroy(): void {
    this.counterSubscription.unsubscribe();
  }


}
