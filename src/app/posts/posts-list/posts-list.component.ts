import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf } from "@angular/common";
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
} from "@angular/material/table";
import {MatAnchor, MatButton} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "./confirm-dialog/confirm-dialog.component";
import {PostsStore} from "../state/posts.state";

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [
    AsyncPipe, NgForOf, NgIf, RouterLink,
    MatTable, MatColumnDef, MatHeaderCell,
    MatHeaderCellDef, MatCellDef, MatCell, MatButton,
    MatHeaderRowDef, MatRowDef, MatTable, MatAnchor, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatCellDef, MatCell, MatButton, MatHeaderRow, MatHeaderRowDef, MatRowDef, MatRow, RouterOutlet, MatProgressSpinnerModule

  ],
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'] // Corretto "styleUrls"
})
export class PostsListComponent implements OnInit {
  postsStore = inject(PostsStore);
  displayedColumns: string[] = ["Id", "Title", "Description", "Actions"];
  private dialog = inject(MatDialog);

  async ngOnInit(): Promise<void> {
    // Dispatch dell'azione di caricamento una volta all'avvio
    this.postsStore.loadAll().then();
  }

  onDeletePost(id: number | undefined): void {
    if (id === undefined) {
      this.dialog.open(ConfirmDialogComponent, {
        data: { title:`Post non trovato` ,message: `Post con ID ${id} non trovato`}
      });
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title:`Conferma cancellazione` ,message: `Sei sicuro di cancellare il post con ID ${id}`}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Elemento cancellato con ID:', id);
        // Aggiungi qui la chiamata al servizio per cancellare l'elemento
        this.postsStore.deletePost(id).then()
      }
    });
  }
}
