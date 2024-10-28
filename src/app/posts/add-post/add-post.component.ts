import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {Post} from "../../models/posts.model";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {PostsStore} from "../state/posts.state";

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    MatLabel,
    MatInput,
    MatError,
    MatFormField,
    MatButton
  ],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.scss'
})
export class AddPostComponent {
  public addPostForm: FormGroup = new FormGroup({
    title: new FormControl("", [Validators.required, Validators.minLength(6)]),
    description: new FormControl("", [Validators.required, Validators.minLength(10)])
  })
  private postsStore = inject(PostsStore);

  onAddPost() {
    const post: Post = {...this.addPostForm.value}
    this.postsStore.addPost(post).then()
  }



}
