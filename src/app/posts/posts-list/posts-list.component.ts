import {Component, inject} from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {Post} from "../../models/posts.model";
import {getPosts} from "../state/posts.selectors";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {RouterLink, RouterOutlet} from "@angular/router";
import {deletePost, loadPosts} from "../state/posts.actions";
import {AppState} from "../../store/app.state";

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    NgIf,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.scss'
})
export class PostsListComponent {
  posts$: Observable<Post[]> = new Observable();
  private postsStore = inject(Store<AppState>);

  ngOnInit(): void {
    this.postsStore.dispatch(loadPosts())
    this.posts$ = this.postsStore.select(getPosts);
  }

  onDeletePost(id: number | undefined): void {

    if (id === undefined) {
      alert("Errore: ID non trovato. Impossibile cancellare il post.");
      return;
    }

    const confirmationMessage = `Sei sicuro di voler cancellare il post con ID: ${id}?`;

    if (this.confirmDelete(confirmationMessage)) {
      try {
        this.postsStore.dispatch(deletePost({ id })); // Dispatch dell'azione di cancellazione
        alert("Post cancellato con successo.");
      } catch (error) {
        console.error("Errore durante la cancellazione del post:", error);
        alert("Si è verificato un errore durante la cancellazione del post.");
      }
    }
  }

  confirmDelete(message: string): boolean {
    return confirm(message);
  }

}
