import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Store } from '@ngrx/store';
import {filter, map, Subscription, switchMap} from 'rxjs';
import {getPostById} from "../state/posts.selectors";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { initialPost, Post } from "../../models/posts.model";
import {NgIf} from "@angular/common";
import {updatePost} from "../state/posts.actions";
import {AppState} from "../../store/app.state";
import {RootState} from "../../store/root.state";
import {setLoadingSpinner} from "../../store/shared/shared.actions";


@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
  imports: [ReactiveFormsModule, NgIf],
  standalone: true
})
export class EditPostComponent implements OnInit, OnDestroy {
  routeSubscription: Subscription = new Subscription();
  editPostForm: FormGroup = new FormGroup({});
  id: number = 0;

  private route = inject(ActivatedRoute);
  private postsStore = inject(Store<AppState>)
  private router = inject(Router)
  private post: Post = initialPost;
  private sharedStore = inject(Store<RootState>)

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map(params => params.get('id')),
        map(idParam => (idParam ? +idParam : null)),
        filter((id): id is number => id !== null),
        switchMap(id => {
          this.id = id;
          return this.postsStore.select(getPostById(id)).pipe(
            filter((post) => !!post)
          );
        })
      )
      .subscribe((post: Post) => {
          this.createForm(post);
          this.post = {...post};
          console.log(this.post);

      });

  }

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  createForm(post: Post) {
    this.editPostForm = new FormGroup({
      title: new FormControl(post.title, [Validators.required, Validators.minLength(6)]),
      description: new FormControl(post.description, [Validators.required, Validators.minLength(10)])
    });
    console.log(this.editPostForm.value);
  }

  onEditPost() {
    if (this.editPostForm.valid) {
      this.sharedStore.dispatch(setLoadingSpinner({ status: true }));
      const updatedPost: Post = {
        id: this.id, // Manteniamo l'ID e le altre proprietà
        ...this.editPostForm.value // Aggiorniamo solo i campi del form (title e description)
      };
      console.log(updatedPost.id)
      console.log(updatedPost);
      this.postsStore.dispatch(updatePost({ post: updatedPost}))
    }
    this.router.navigate(['posts']).then()
  }
}
