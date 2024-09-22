import { Component, OnDestroy, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Subscription, switchMap } from 'rxjs';
import { PostsState } from "../state/posts.state";
import { getPostById } from "../state/post.selectors";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { initialPost, Post } from "../../models/posts.model";
import {NgIf} from "@angular/common";
import {updatePost} from "../state/posts.actions";


@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
  imports: [ReactiveFormsModule, NgIf],
  standalone: true
})
export class EditPostComponent implements OnInit, OnDestroy {
  id: number | null = null;
  routeSubscription: Subscription = new Subscription();
  editPostForm: FormGroup = new FormGroup({});
  post: Post = initialPost;

  constructor(private route: ActivatedRoute, private postsStore: Store<PostsState>, private router: Router) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap
      .pipe(
        map((params) => params.get('id')),
        map((idParam: string | null) => (idParam ? +idParam : null)),
        switchMap((id) => this.postsStore.select(getPostById, { id }))
      )
      .subscribe((post) => {
       if(post === undefined) {
         throw new Error("Post non trovato")
       } else {
         this.post = post;
         this.createForm();
       }
       // Richiama createForm quando il post cambia
      });
  }

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  createForm() {
    this.editPostForm = new FormGroup({
      title: new FormControl(this.post.title, [Validators.required, Validators.minLength(6)]),
      description: new FormControl(this.post.description, [Validators.required, Validators.minLength(10)])
    });
    console.log(this.editPostForm.value);
  }

  onEditPost() {
    if (this.editPostForm.valid) {
      const updatedPost: Post = { ...this.post, ...this.editPostForm.value };
     this.postsStore.dispatch(updatePost({ post: updatedPost}))
    }
    this.router.navigate(['posts']).then()
  }
}
