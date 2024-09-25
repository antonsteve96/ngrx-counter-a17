import {Component, inject} from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {Post} from "../../models/posts.model";
import {getPosts} from "../state/post.selectors";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {RouterLink, RouterOutlet} from "@angular/router";
import {deletePost} from "../state/posts.actions";
import {RootState} from "../../store/root.state";
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
    this.posts$ = this.postsStore.select(getPosts);
  }

  onDeletePost(id: number | undefined): void {
    if (id === undefined) {
      console.error("Id non trovato"); // Segnala l'errore alla console (puoi anche mostrarlo all'utente)
      alert("Errore: ID non trovato. Impossibile cancellare il post.");
      return;
    }

    // Conferma prima di procedere con la cancellazione
    if (confirm("Sei sicuro di voler cancellare?")) {
      this.postsStore.dispatch(deletePost({ id }));
    }
  }

}
