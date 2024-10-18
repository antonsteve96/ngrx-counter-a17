import {Component, Inject, inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {Store} from "@ngrx/store";
import {AuthState} from "../../../auth/state/auth.state";
import {AppState} from "../../../store/app.state";

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
    MatButton
  ],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {
  private dialogRef = inject(MatDialogRef<ConfirmDialogComponent>)
  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string, message: string }
  ) {
  }
  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false)
  }
}
