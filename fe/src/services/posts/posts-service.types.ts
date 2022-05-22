import { IPost, IPostAndComments } from "../../types/posts";

export type GetPostResponseSuccess = {
  data: IPostAndComments;
};

export type GetPostResponseLoadingState = {
  state: "loading";
};

export type GetPostResponseFailedState = {
  state: "failed";
  message: string;
  code: number;
};

export type GetPostSuccessState = {
  state: "success";
  data: IPostAndComments;
};

export type GetPostResponse =
  | GetPostSuccessState
  | GetPostResponseFailedState
  | GetPostResponseLoadingState;

export type UpdatePostResponseSuccess = {
  data: IPost;
};

export type UpdatePostResponseLoadingState = {
  state: "loading";
};

export type UpdatePostResponseFailedState = {
  state: "failed";
  message: string;
  code: number;
};

export type UpdatePostSuccessState = {
  state: "success";
  data: IPost;
};

export type UpdatePostResponse =
  | UpdatePostSuccessState
  | UpdatePostResponseFailedState
  | UpdatePostResponseLoadingState;

export type CreatePostResponseSuccess = {
  data: IPost;
};

export type CreatePostResponseLoadingState = {
  state: "loading";
};

export type CreatePostResponseFailedState = {
  state: "failed";
  message: string;
  code: number;
};

export type CreatePostSuccessState = {
  state: "success";
  data: IPost;
};

export type CreatePostResponse =
  | CreatePostSuccessState
  | CreatePostResponseFailedState
  | CreatePostResponseLoadingState;

export type DeletePostResponseSuccess = {
  data: string;
};

export type DeletePostResponseLoadingState = {
  state: "loading";
};

export type DeletePostResponseFailedState = {
  state: "failed";
  message: string;
  code: number;
};

export type DeletePostSuccessState = {
  state: "success";
  data: string;
};

export type DeletePostResponse =
  | DeletePostSuccessState
  | DeletePostResponseFailedState
  | DeletePostResponseLoadingState;
