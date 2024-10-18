import { Component, inject, OnInit, Signal } from '@angular/core';
import { Store } from "@ngrx/store";
import { filter } from "rxjs";
import { Post } from "../../models/posts.model";
import { getPosts } from "../state/posts.selectors";
import { AsyncPipe, NgForOf, NgIf } from "@angular/common";
import {RouterLink, RouterOutlet} from "@angular/router";
import { deletePost, loadPosts } from "../state/posts.actions";
import { AppState } from "../../store/app.state";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatAnchor, MatButton} from "@angular/material/button";
import {toSignal} from "@angular/core/rxjs-interop";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "./confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [
    AsyncPipe, NgForOf, NgIf, RouterLink,
    MatTable, MatColumnDef, MatHeaderCell,
    MatHeaderCellDef, MatCellDef, MatCell, MatButton,
    MatHeaderRowDef, MatRowDef, MatTable, MatAnchor, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatCellDef, MatCell, MatButton, MatHeaderRow, MatHeaderRowDef, MatRowDef, MatRow, RouterOutlet
  ],
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'] // Corretto "styleUrls"
})
export class PostsListComponent implements OnInit {
  private postsStore = inject(Store<AppState>);
  displayedColumns: string[] = ["Id", "Title", "Description", "Actions"];
  private dialog = inject(MatDialog);

  // Definire `posts` direttamente con `toSignal`
  posts: Signal<Post[]> = toSignal(
    this.postsStore.select(getPosts).pipe(filter((posts) => posts !== null)),
    { initialValue: [] }
  );

  ngOnInit(): void {
    // Dispatch dell'azione di caricamento una volta all'avvio
    this.postsStore.dispatch(loadPosts());
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
        this.postsStore.dispatch(deletePost({id}))
      }
    });




  }



}
