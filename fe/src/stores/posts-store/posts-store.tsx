import {
  createContext,
  PropsWithChildren,
  ReactElement,
  useReducer,
  useEffect,
} from "react";

import { setPostsAction } from "./posts-actions";
import { initialPostsState, postsReducer } from "./posts-reducer";
import postsService from "../../services/posts/posts-service";

// TODO: most likely remove

interface IPostsContext {
  state: any;
  fetchDataFeed: () => {};
}

const PostsStore = createContext<IPostsContext | null>(null);

const PostsContextProvider = ({
  children,
}: PropsWithChildren<Record<string, unknown>>): ReactElement => {
  const [state, dispatch] = useReducer(postsReducer, initialPostsState);

  const fetchDataFeed = async () => {
    const postsData = await postsService.getAll();

    if (postsData) {
      setPostsAction(postsData, dispatch);
    }
  };

  return (
    <PostsStore.Provider value={{ state, fetchDataFeed }}>
      {children}
    </PostsStore.Provider>
  );
};

export { PostsStore, PostsContextProvider };
