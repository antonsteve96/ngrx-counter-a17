import {Component, inject} from '@angular/core';
import {Store} from "@ngrx/store";
import { Subscription} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {getCounter} from "../state/counter.selectors";
import { RootState} from "../../store/root.state";
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

  private counterStore = inject(Store<AppState>);

  ngOnInit(): void {
    this.counterSubscription = this.counterStore.select(getCounter).subscribe((counter) => this.counter = counter)
  }

  ngOnDestroy(): void {
    this.counterSubscription.unsubscribe();
  }


}
