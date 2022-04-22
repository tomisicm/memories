import { PostState, PostActions, SET_POSTS } from "./post-types";

const initialPostsState: PostState = {
  posts: [],
};

const postsReducer = (
  state = initialPostsState,
  action: PostActions
): PostState => {
  switch (action.type) {
    case SET_POSTS: {
      return {
        ...state,
        posts: action.payload,
      };
    }
    default:
      return state;
  }
};

export { postsReducer, initialPostsState };
