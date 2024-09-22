import {Post} from "../../models/posts.model";

export interface PostsState{
  posts: Post[]
}

export const initialState: PostsState = {
  posts : [
    {
      id: 1,
      title: "Titolo esemplificativo 1",
      description: "Descrizione esemplificativa 1"
    },
    {
      id: 2,
      title: "Titolo esemplificativo 2",
      description: "Descrizione esemplificativa 2"
    }
  ]
}
