import { useContext } from "react";
import { PostsStore } from "./posts-store";

export const usePostsContext = () => {
  const context = useContext(PostsStore);

  if (context === undefined) {
    throw new Error("usePostsContext was used outside of its Provider");
  }

  return context;
};
