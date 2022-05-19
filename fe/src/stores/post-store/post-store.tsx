import {
  createContext,
  PropsWithChildren,
  ReactElement,
  useReducer,
  useEffect,
} from "react";

import { initialPostState, postReducer } from "./post-reducer";
import postsService from "../../services/posts/posts-service";
import { IPostAndComments } from "../../types/posts";
import { setPostAction } from "./post-actions";

interface PostState {
  loading: boolean;
  post: IPostAndComments | null;
  error: string | null;
}

interface IPostContext {
  state: PostState;
  fetchPostFeed: (id: string) => void;
}

const PostStore = createContext<IPostContext | null>(null);

const PostContextProvider = ({
  children,
}: PropsWithChildren<Record<string, unknown>>): ReactElement => {
  const [state, dispatch] = useReducer(postReducer, initialPostState);

  const fetchPostFeed = async (id: string) => {
    try {
      const response = await postsService.get(id);

      switch (response.state) {
        case "loading": {
          setPostAction({ loading: true, post: null, error: null }, dispatch);
          break;
        }
        case "failed": {
          setPostAction(
            { loading: false, post: null, error: response.message },
            dispatch
          );
          break;
        }
        case "success": {
          setPostAction(
            { loading: false, post: response.data, error: null },
            dispatch
          );
          break;
        }
      }
    } catch (e) {
      setPostAction(
        { loading: false, post: null, error: "Something went wrong!" },
        dispatch
      );
    }
  };

  return (
    <PostStore.Provider value={{ state, fetchPostFeed }}>
      {children}
    </PostStore.Provider>
  );
};

export { PostStore, PostContextProvider };
