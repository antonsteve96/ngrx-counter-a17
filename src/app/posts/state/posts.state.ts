import { initialPost, Post } from "../../models/posts.model";
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { inject } from "@angular/core";
import { PostsService } from "../../services/posts.service";

type PostsState = {
  posts: Post[],
  currentPost: Post,
  loading: boolean
}

export const initialState: PostsState = {
  posts: [],
  currentPost: initialPost,
  loading: false
}

export const PostsStore = signalStore(
  { providedIn: "root" },
  withState(initialState),
  withMethods(
    (store, postsService = inject(PostsService)) => ({

      async loadAll() {
        console.log("loadAll() chiamato");  // Log per il debug
        patchState(store, { loading: true });

        try {
          const allPosts = await postsService.getAllPosts();
          if (allPosts) {
            patchState(store, { posts: allPosts, loading: false });
            console.log("Post caricati con successo:", allPosts);
          } else {
            throw new Error("Errore nel caricamento dei post");
          }
        } catch (error) {
          console.error("Errore nel caricamento dei post:", error);
          patchState(store, { loading: false });
        }
      },

      async addPost(post: Post) {
        try {
          const addedPost = await postsService.addPost(post);
          if (addedPost) {
            patchState(store, (state) => ({
              posts: [...state.posts, addedPost]
            }));
            console.log("Post aggiunto con successo:", addedPost);
          } else {
            throw new Error("Errore nell'aggiunta del post");
          }
        } catch (error) {
          console.error("Errore nell'aggiunta del post:", error);
        }
      },

      async deletePost(id: number) {
        try {
          await postsService.deletePost(id);
          patchState(store, (state) => ({
            posts: state.posts.filter((post: Post) => post.id !== id)
          }));
          console.log(`Post con id ${id} eliminato con successo`);
        } catch (error) {
          console.error(`Errore nella cancellazione del post con id ${id}:`, error);
        }
      },

      async updatePost(updatedPost: Post) {
        try {
          await postsService.updatePost(updatedPost);
          patchState(store, (state) => ({
            posts: state.posts.map(post => post.id === updatedPost.id ? { ...updatedPost } : post)
          }));
          console.log(`Post con id ${updatedPost.id} aggiornato con successo`);
        } catch (error) {
          console.error(`Errore nell'aggiornamento del post con id ${updatedPost.id}:`, error);
        }
      },

      getAllPosts(): Post[] {
        return store.posts();
      },

      getLoading(): boolean {
        return store.loading();
      },

      getPostById(id: number): Post | null {
        store.posts().filter(post => console.debug(post.id,"==",id))
        return store.posts().filter(post => post.id === id)[0] || null;
      }
    })
  )
);
