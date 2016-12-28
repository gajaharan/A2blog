export class Comments {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export class IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
  comments = new Comments();
}
