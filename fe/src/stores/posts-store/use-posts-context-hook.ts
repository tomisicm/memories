import { useContext } from "react";
import { PostStore } from "./post-store";

export const usePostsContext = () => {
  const context = useContext(PostStore);

  if (context === undefined) {
    throw new Error("usePostsContext was used outside of its Provider");
  }

  return context;
};
