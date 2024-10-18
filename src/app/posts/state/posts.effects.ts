import {inject, Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {PostsService} from "../../services/posts.service";
import {
  addPost,
  addPostsSuccess,
  deletePost, deletePostSuccess,
  loadPosts,
  loadPostsSuccess,
  updatePost,
  updatePostSuccess
} from "./posts.actions";
import {asyncScheduler, catchError, exhaustMap, filter, map, mergeMap, scheduled, switchMap} from "rxjs";
import {Store} from "@ngrx/store";
import {setErrorMessage, setLoadingSpinner} from "../../store/shared/shared.actions";
import {RootState} from "../../store/root.state";
import {SharedService} from "../../services/shared.service";
import {BaseRouterStoreState, ROUTER_NAVIGATION, RouterNavigatedAction} from "@ngrx/router-store";
import {RouterStateUrl} from "../../router/custom-serializer";

@Injectable()
export class PostsEffects {
  private actions$ = inject(Actions);
  private postsService = inject(PostsService);
  private sharedService = inject(SharedService);
  private sharedStore = inject(Store<RootState>);


  loadPosts$ = createEffect(() => this.actions$.pipe(
    ofType(loadPosts),
    exhaustMap(() => this.postsService.getAllPosts().pipe(
      map((posts) => {
        console.log(posts);
        return loadPostsSuccess({posts});
      }),
      catchError((error) => {
        const errorMessage = this.sharedService.getErrorCode(error.status)
        return scheduled([setErrorMessage({message: errorMessage})], asyncScheduler);
      })
    ))))

  addPost$ = createEffect(() => this.actions$.pipe(
    ofType(addPost),
    mergeMap((action) =>
      this.postsService.addPost(action.post).pipe(
        map((post) => {
          this.sharedStore.dispatch(setLoadingSpinner({status: false}))
          return addPostsSuccess({post: post})
        }),
        catchError((error) => {
          this.sharedStore.dispatch(setLoadingSpinner({status: false}))
          const errorMessage = this.sharedService.getErrorCode(error.status)
          return scheduled([setErrorMessage({message: errorMessage})], asyncScheduler);
        })
      )
    )
  ));

  updatePosts$ = createEffect(() => this.actions$.pipe(
    ofType(updatePost),
    mergeMap((action) => this.postsService.updatePost(action.post).pipe(
      map((post) => {
        this.sharedStore.dispatch(setLoadingSpinner({status: false}));
        return updatePostSuccess({post});
      }),
      catchError((error) => {
        this.sharedStore.dispatch(setLoadingSpinner({status: false}));
        const errorMessage = this.sharedService.getErrorCode(error.status);
        return scheduled([setErrorMessage({message: errorMessage})], asyncScheduler);
      })
    ))
  ));

  deletePost$ = createEffect(() => this.actions$.pipe(
    ofType(deletePost),
    mergeMap((action) => {
      return this.postsService.deletePost(action.id).pipe(
        map(() => deletePostSuccess()),
        catchError((error) => {
          this.sharedStore.dispatch(setLoadingSpinner({status: false}));
          const errorMessage = this.sharedService.getErrorCode(error.status);
          return scheduled([setErrorMessage({message: errorMessage})], asyncScheduler);
        })
      )
    })
  ))

  getPostDetails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: RouterNavigatedAction) => {
        return r.payload.routerState.url.startsWith("posts/details")
      }),
      map((r: any) => {
        return r.payload.routerState['params']['id']
      }),
      switchMap((id: number) => {
        return this.postsService.getPostById(id).pipe(
          map(post => loadPostsSuccess({ posts: [{ ...post, id }] })))
      })
    )
  });

}
