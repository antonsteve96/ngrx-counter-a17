import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Store} from "@ngrx/store";
import {CounterState} from "../state/counter.state";
import {customIncrement} from "../state/counter.actions";
import {getSiteName} from "../state/counter.selectors";
import {AppState} from "../../store/app.state";

@Component({
  selector: 'app-custom-counter-input',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './custom-counter-input.component.html',
  styleUrl: './custom-counter-input.component.scss'
})
export class CustomCounterInputComponent {
  customCounterForm: FormGroup = new FormGroup({
    value: new FormControl("")
  })
  siteName: string = "";

  constructor(private counterStore: Store<AppState>) {
  }

   ngOnInit(): void {
    this.counterStore.select(getSiteName).subscribe((siteName) => this.siteName = siteName)
  }

  onAdd() {
    this.counterStore.dispatch(customIncrement({value: +this.customCounterForm.value.value}))
  }




}
