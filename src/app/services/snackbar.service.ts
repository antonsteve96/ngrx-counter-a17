import {inject, Injectable} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private snackBar = inject(MatSnackBar)

  openSnackbar(message: string, action: string = 'Chiudi', duration: number = 3000) {
    this.snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: 'warn'
    });
  }
}
