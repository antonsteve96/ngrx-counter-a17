import {inject, Injectable, SkipSelf} from "@angular/core";
import {environment} from "../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {Post, PostResponse} from "../models/posts.model";
import {firstValueFrom, map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class PostsService {
  @SkipSelf() private http = inject(HttpClient);
  apiUrl: string = environment.apiUrl;
  apiPort: string = environment.apiPort;

  async getAllPosts(): Promise<Post[]> {
    const url = `http://${this.apiUrl}:${this.apiPort}/api/v1/posts/all`;
    const posts = await firstValueFrom(this.http.get<PostResponse[]>(url));
    return posts.map((post) => ({
      id: post.id,
      title: post.title,
      description: post.description
    }));
  }

  async addPost(post: Post): Promise<Post> {
    const url = `http://${this.apiUrl}:${this.apiPort}/api/v1/posts/add`;
    return await firstValueFrom(this.http.post<Post>(url,post));
  }

  async updatePost(post: Post): Promise<Post> {
    const url = `http://${this.apiUrl}:${this.apiPort}/api/v1/posts/update/${post.id}`;
    console.log("post", post)
    return await firstValueFrom(this.http.put<Post>(url,post));
  }

  deletePost(id: number): Promise<void> {
    const url = `http://${this.apiUrl}:${this.apiPort}/api/v1/posts/delete/${id}`;
    return firstValueFrom(this.http.delete<void>(url));
  }

  getPostById(id: number): Observable<Post> {
    const url = `http://${this.apiUrl}:${this.apiPort}/api/v1/posts/details/${id}`;
    return this.http.get<Post>(url)
  }

}
