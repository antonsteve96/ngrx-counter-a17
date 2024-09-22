import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {Post} from "../../models/posts.model";
import {AppState} from "../../store/app.state";
import {Store} from "@ngrx/store";
import {addPost} from "../state/posts.actions";

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

  constructor(private postStore: Store<AppState>) {}

  onAddPost() {
    console.log(this.addPostForm.value);
    const post: Post = {...this.addPostForm.value}
    this.postStore.dispatch(addPost({ post: post }))
  }



}
