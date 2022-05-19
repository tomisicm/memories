import { IPostAndComments } from "../../types/posts";

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
