import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs";
import {AppState} from "../../store/app.state";
import {Store} from "@ngrx/store";
import {deletePost} from "../state/posts.actions";

@Component({
  selector: 'app-delete-post',
  standalone: true,
  imports: [],
  templateUrl: './delete-post.component.html',
  styleUrl: './delete-post.component.scss'
})
export class DeletePostComponent {

  constructor(private route: ActivatedRoute, private postsStore: Store<AppState>) {
  }

}
