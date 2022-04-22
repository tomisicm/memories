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

interface IPostsContext {
  state: any;
}

const PostStore = createContext<IPostsContext | null>(null);

const PostsContextProvider = ({
  children,
}: PropsWithChildren<Record<string, unknown>>): ReactElement => {
  const [state, dispatch] = useReducer(postsReducer, initialPostsState);

  useEffect(() => {
    const fetchPosts = async () => {
      const postData = await postsService.getAll();

      if (postData) {
        setPostsAction(postData, dispatch);
      }
    };

    fetchPosts();
  }, []);

  return <PostStore.Provider value={{ state }}>{children}</PostStore.Provider>;
};

export { PostStore, PostsContextProvider };
