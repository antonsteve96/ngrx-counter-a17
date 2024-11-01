export interface Post {
  id?: number;
  title: string;
  description: string;
}

export const initialPost: Post = {
  id: 0,
  title: "",
  description: ""
}

export type PostResponse = Post & {
  createdDate?: Date | null;
  lastModifiedDate?: Date | null;
}
