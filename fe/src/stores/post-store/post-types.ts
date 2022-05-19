import { IPostAndComments } from "../../types/posts";

const SET_POST = "SET_POST";
const UPDATE_POST = "UPDATE_POST";

interface PostState {
  loading: boolean;
  post: IPostAndComments | null;
  error: string | null;
}

export interface SetPostActionPayload {
  loading: boolean;
  post: IPostAndComments | null;
  error: string | null;
}

interface SetPostAction {
  type: typeof SET_POST;
  payload: SetPostActionPayload;
}

type PostActions = SetPostAction;

export { SET_POST, UPDATE_POST };
export type { SetPostAction, PostActions, PostState };
