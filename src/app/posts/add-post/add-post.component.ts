import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {Post} from "../../models/posts.model";
import {Store} from "@ngrx/store";
import {addPost} from "../state/posts.actions";
import {AppState} from "../../store/app.state";

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.scss'
})
export class AddPostComponent {
  public addPostForm: FormGroup = new FormGroup({
    title: new FormControl("", [Validators.required, Validators.minLength(6)]),
    description: new FormControl("", [Validators.required, Validators.minLength(10)])
  })

  private postsStore = inject(Store<AppState>);

  onAddPost() {
    console.log(this.addPostForm.value);
    const post: Post = {...this.addPostForm.value}
    this.postsStore.dispatch(addPost({ post: post }))
  }



}
