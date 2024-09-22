import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { counterReducer } from "./counter/state/counter.reducer";
import { StoreModule } from "@ngrx/store";
import { CounterComponent } from "./counter/counter/counter.component";
import {HeaderComponent} from "./shared/components/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CounterComponent,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // Corretto con "styleUrls"
})
export class AppComponent {
  title = 'ngrx-counter-a17';
}
