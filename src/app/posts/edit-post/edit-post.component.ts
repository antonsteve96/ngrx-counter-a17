import {Component, inject, OnInit, signal} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import {initialPost, Post} from "../../models/posts.model";
import {NgIf} from "@angular/common";
import {MatError, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {PostsStore} from "../state/posts.state";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
  imports: [ReactiveFormsModule, NgIf, MatLabel, MatFormFieldModule, MatError, MatButton, MatInput],
  standalone: true
})
export class EditPostComponent implements OnInit {
  editPostForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(6)]),
    description: new FormControl('', [Validators.required, Validators.minLength(10)])
  });
  id =signal<number>(0);
  route = inject(ActivatedRoute)

  private postsStore = inject(PostsStore);

  ngOnInit(): void {
    this.id.set(Number(this.route.snapshot.params['id']));
    console.debug(this.id);
    const post = this.postsStore.getPostById(this.id());

    if (post) {
      console.debug("Post to edit:", post);
      this.createForm(post);
    } else {
      console.error("Post non trovato con id:", this.id());
    }
  }

  createForm(post: Post) {
    this.editPostForm = new FormGroup({
      title: new FormControl(post.title, [Validators.required, Validators.minLength(6)]),
      description: new FormControl(post.description, [Validators.required, Validators.minLength(10)])
    });
    console.debug(post);
  }

  onEditPost() {
    if (this.editPostForm.valid) {
      const updatedPost: Post = {
        id: this.id(),
        ...this.editPostForm.value
      };
      this.postsStore.updatePost(updatedPost).then();
    }
  }
}
