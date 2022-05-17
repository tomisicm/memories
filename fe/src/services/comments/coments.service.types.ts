export interface CreateCommentBody {
  body: string;
  postId: string;
  status: string;
}

export type CreateCommentResponseSuccess = {
  data: {
    id: string;
    body: string;
    authorId: string;
    postId: string;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
  };
};

export type CreateCommentResponseLoadingState = {
  state: "loading";
};

export type CreateCommentResponseFailedState = {
  state: "failed";
  message: string;
  code: number;
};

export type CreateCommentSuccessState = {
  state: "success";
  data: {
    id: string;
    body: string;
    authorId: string;
    postId: string;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
  };
};

export type CreateCommentResponse =
  | CreateCommentSuccessState
  | CreateCommentResponseFailedState
  | CreateCommentResponseLoadingState;
