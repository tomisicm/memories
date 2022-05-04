import { useContext } from "react";
import { UserStore } from "./user-store";

export const useUsersContext = () => {
  const context = useContext(UserStore);

  if (context === undefined) {
    throw new Error("usePostsContext was used outside of its Provider");
  }

  return context;
};
