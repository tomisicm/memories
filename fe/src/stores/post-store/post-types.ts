import { IPost, IPostAndComments } from "../../types/posts";

const SET_POST = "SET_POST";
const UPDATE_POST = "UPDATE_POST";
const DELETE_POST = "DELETE_POST";

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

export interface UpdatePostActionPayload {
  loading: boolean;
  post: IPost | null;
  error: string | null;
}

interface UpdatePostAction {
  type: typeof UPDATE_POST;
  payload: UpdatePostActionPayload;
}

export interface DeletePostActionPayload {
  loading: boolean;
  post: IPostAndComments | null;
  error: string | null;
}

interface DeletePostAction {
  type: typeof DELETE_POST;
  payload: DeletePostActionPayload;
}

type PostActions = SetPostAction | UpdatePostAction | DeletePostAction;

export { SET_POST, UPDATE_POST, DELETE_POST };
export type {
  SetPostAction,
  UpdatePostAction,
  DeletePostAction,
  PostActions,
  PostState,
};
