import {
  PostState,
  PostActions,
  SET_POST,
  UPDATE_POST,
  DELETE_POST,
} from "./post-types";

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
    case UPDATE_POST: {
      const updatedPost = { ...state.post, ...action.payload.post };

      if (action.payload.post) {
        return {
          ...state,
          ...action.payload,
          post: { ...state.post, ...updatedPost },
        } as PostState;
      } else {
        return {
          ...state,
          loading: action.payload.loading,
          post: null,
          error: action.payload.error,
        } as PostState;
      }
    }
    default:
      return state;
  }
};

export { postReducer, initialPostState };
