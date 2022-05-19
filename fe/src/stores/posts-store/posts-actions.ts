import { Dispatch } from "react";
import { IPost } from "../../types/posts";

import { SetPostAction, SET_POSTS } from "./posts-types";

const setPostsAction = (
  posts: IPost[],
  dispatch: Dispatch<SetPostAction>
): void => {
  dispatch({ type: SET_POSTS, payload: posts });
};

export { setPostsAction };
