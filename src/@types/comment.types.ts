import type { Like } from "./like.types";
import type { Post } from "./post.types";
import type { User } from "./user.types";

export interface CreateComment {
  text: string | null;
  image: string | null;
}

export interface Comment {
  id: string;
  text: string | null;
  imageUrl: string | null;
  likes: Like[];
  comments: Comment[];
  createdAt: string;
  user: User;
  post: Post;
  parentComment?: Comment | null;
}

export interface GetComment {
  id: string;
}