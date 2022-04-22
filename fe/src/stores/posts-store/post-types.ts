import { IPost } from "../../types/posts";

const SET_POSTS = "SET_POSTS";
const UPDATE_POSTS = "UPDATE_POSTS";

interface PostState {
  posts: IPost[];
}

interface SetPostAction {
  type: typeof SET_POSTS;
  payload: IPost[]; // some response
}

// UPDATE WHEN THERE IS MORE with OR
type PostActions = SetPostAction;

export { SET_POSTS, UPDATE_POSTS };
export type { SetPostAction, PostActions, PostState };
