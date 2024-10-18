import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Store } from '@ngrx/store';
import {filter, map, switchMap, tap, Subject, takeUntil, Subscription} from 'rxjs';
import {getPostById} from "../state/posts.selectors";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { initialPost, Post } from "../../models/posts.model";
import {NgIf} from "@angular/common";
import {updatePost, loadPosts} from "../state/posts.actions"; // Importa l'azione per caricare il post
import {AppState} from "../../store/app.state";
import {RootState} from "../../store/root.state";
import {setLoadingSpinner} from "../../store/shared/shared.actions";
import {MatError, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";


@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
  imports: [ReactiveFormsModule, NgIf, MatLabel, MatFormFieldModule, MatError, MatButton, MatInput],
  standalone: true
})
export class EditPostComponent implements OnInit, OnDestroy {
  editPostForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(6)]),
    description: new FormControl('', [Validators.required, Validators.minLength(10)])
  });
  id =signal(0);
  private onDestroy$ = new Subject<void>();

  private postsStore = inject(Store<AppState>);
  private post = signal(initialPost);
  private sharedStore = inject(Store<RootState>);

  ngOnInit(): void {
    this.postsStore.select(getPostById).pipe(
      filter((post: Post | undefined) => !!post),
      tap((post: Post) => this.createForm(post)),
      takeUntil(this.onDestroy$)
    ).subscribe((post: Post) =>
      this.post.set(post)
    )
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  createForm(post: Post) {
    this.editPostForm = new FormGroup({
      title: new FormControl(post.title, [Validators.required, Validators.minLength(6)]),
      description: new FormControl(post.description, [Validators.required, Validators.minLength(10)])
    });
    console.log(post);
  }

  onEditPost() {
    if (this.editPostForm.valid) {
      this.sharedStore.dispatch(setLoadingSpinner({ status: true }));
      const updatedPost: Post = {
        id: this.id(),
        ...this.editPostForm.value
      };
      this.postsStore.dispatch(updatePost({ post: updatedPost}));
    }
  }
}
