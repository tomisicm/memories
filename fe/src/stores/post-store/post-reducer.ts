import { PostState, PostActions, SET_POST } from "./post-types";

const initialPostState: PostState = {
  loading: false,
  post: null,
  error: null,
};

const postReducer = (
  state = initialPostState,
  action: PostActions
): PostState => {
  switch (action.type) {
    case SET_POST: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};

export { postReducer, initialPostState };
