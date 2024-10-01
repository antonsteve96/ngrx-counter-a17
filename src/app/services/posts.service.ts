import {inject, Injectable, SkipSelf} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Post, PostResponse} from "../models/posts.model";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class PostsService {
  @SkipSelf() private http = inject(HttpClient);
  apiUrl: string = environment.apiUrl;
  apiPort: string = environment.apiPort;

  getAllPosts():Observable<Post[]> {
    const url = `http://${this.apiUrl}:${this.apiPort}/api/v1/posts/all`;
    return this.http.get<PostResponse[]>(url).pipe(
      map((posts: PostResponse[]) => {
        return posts.map((post) => {
          return {
            id: post.id,
            title: post.title,
            description: post.description,
          }
        })
      })
    )
  }

  addPost(post: Post): Observable<Post> {
    const url = `http://${this.apiUrl}:${this.apiPort}/api/v1/posts/add`;
    return this.http.post<Post>(url,post);
  }

  updatePost(post: Post): Observable<Post> {
    console.log(post.id)
    const url = `http://${this.apiUrl}:${this.apiPort}/api/v1/posts/update/${post.id}`;
    return this.http.put<Post>(url,post);
  }

  deletePost(id: number) {
    const url = `http://${this.apiUrl}:${this.apiPort}/api/v1/posts/delete/${id}`;
    return this.http.delete<void>(url);
  }

}
