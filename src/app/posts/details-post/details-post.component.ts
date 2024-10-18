import {Component, inject, OnInit, signal} from '@angular/core';
import {initialPost, Post} from "../../models/posts.model";
import {AppState} from "../../store/app.state";
import {Store} from "@ngrx/store";
import {getPostById} from "../state/posts.selectors";
import {filter} from "rxjs";
import {toSignal} from "@angular/core/rxjs-interop";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-details-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details-post.component.html',
  styleUrl: './details-post.component.scss'
})
export class DetailsPostComponent implements OnInit {
  private postsStore = inject(Store<AppState>);
  post = toSignal(
    this.postsStore.select(getPostById).pipe(
      filter((post: Post | undefined) => post !== undefined)
    ),
    { initialValue: initialPost }
  );


  ngOnInit(): void {

  }
}
