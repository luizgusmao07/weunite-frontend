export interface CreatePost {
  text?: string | null;
  media?: File | null;
}

export interface UpdatePost {
  text: string | null;
  image: File | null;
}

export interface GetPost {
  id: string;
}

export interface DeletePost {
  id: string;
}

