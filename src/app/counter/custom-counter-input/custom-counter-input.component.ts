import {Component, inject, OnInit, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Store} from "@ngrx/store";
import {getSiteName} from "../state/counter.selectors";
import {MatButton} from "@angular/material/button";
import {MatInput, MatLabel} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";

@Component({
  selector: 'app-custom-counter-input',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButton,
    MatInput,
    MatLabel,
    MatFormFieldModule
  ],
  templateUrl: './custom-counter-input.component.html',
  styleUrl: './custom-counter-input.component.scss'
})
export class CustomCounterInputComponent implements OnInit{
  customCounterForm: FormGroup = new FormGroup({
    value: new FormControl("")
  })
  siteName = signal("");

  private counterStore = inject(Store<AppState>);

   ngOnInit(): void {
    this.counterStore.select(getSiteName).subscribe((siteName) => this.siteName.set(siteName))
  }

  onAdd() {
    this.counterStore.dispatch(customIncrement({value: Number(this.customCounterForm.value.value)}))
  }




}
