import { useContext } from "react";
import { PostStore } from "./post-store";

export const usePostContext = () => {
  const context = useContext(PostStore);

  if (context === undefined) {
    throw new Error("usePostContext was used outside of its Provider");
  }

  return context;
};
