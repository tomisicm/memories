import { PostsState, PostActions, SET_POSTS } from "./posts-types";

const initialPostsState: PostsState = {
  posts: [],
};

const postsReducer = (
  state = initialPostsState,
  action: PostActions
): PostsState => {
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
