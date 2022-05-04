import React, {
  createContext,
  ReactElement,
  PropsWithChildren,
  useContext,
  useReducer,
} from "react";

import {
  removeFromSessionStorage,
  storeInSessionStorage,
  BROWSER_KEY_SIGNIN,
  BROWSER_KEY_SIGNED_IN,
  BROWSER_KEY_JWT,
} from "../../services/shared/session-storage.service";

import { UserDetails, UserState } from "./user-types";

import { initialUserState, userReducer } from "./user-reducer";
import {
  setLoggedInAction,
  setUserDetailsAction,
  setUserJwtAction,
} from "./user-actions";
import httpService from "../../services/http-service";

interface UserContext {
  state: UserState;
  setJwtData: (jwt: string) => void;
  refreshJwt: () => Promise<void>;
  signIn: (userDetails: UserDetails) => void;
  signOut: () => void;
  setUserDetails: (userDetails: UserDetails) => void;
}

export const UserStoreDefaultValue: UserContext = {
  state: {
    userJwt: null,
    loggedIn: null,
    userDetails: {
      userId: null,
      email: "",
      username: "",
    },
  },
  setJwtData: () => {},
  refreshJwt: () => Promise.resolve(),
  signOut: () => {},
  signIn: () => {},
  setUserDetails: () => {},
};

const UserStore = createContext(UserStoreDefaultValue);

const useUserStore = (): UserContext => useContext(UserStore);

const UserContextProvider = ({
  children,
}: PropsWithChildren<Record<string, unknown>>): ReactElement => {
  const [state, dispatch] = useReducer(userReducer, initialUserState);

  const setLoggedIn = (loggedIn: boolean) => {
    setLoggedInAction(loggedIn, dispatch);
    storeInSessionStorage(BROWSER_KEY_SIGNED_IN, loggedIn);
  };

  const clearStorageData = () => {
    removeFromSessionStorage(BROWSER_KEY_SIGNIN);
    removeFromSessionStorage(BROWSER_KEY_SIGNED_IN);
  };

  const clearSignInData = () => {
    setUserJwtAction(null, dispatch);
    setUserDetails({
      userId: null,
      email: "",
      username: "",
    });
    setLoggedIn(false);
  };

  const signOut = async () => {
    setLoggedInAction(false, dispatch);
    setUserDetailsAction(initialUserState.userDetails, dispatch);
    clearSignInData();
    clearStorageData();
    httpService.deleteJwt();
  };

  const signIn = async (userDetails: UserDetails) => {
    setUserDetailsAction(
      {
        userId: userDetails.userId,
        email: userDetails.email,
        username: userDetails.username,
      },
      dispatch
    );

    storeInSessionStorage(BROWSER_KEY_SIGNIN, userDetails);

    setLoggedIn(true);
  };

  const setJwtData: UserContext["setJwtData"] = (jwt) => {
    storeInSessionStorage(BROWSER_KEY_JWT, jwt);

    setUserJwtAction(jwt, dispatch);

    httpService.setJwt(jwt);
  };

  const setUserDetails = (userDetails: UserDetails) => {
    setUserDetailsAction(userDetails, dispatch);
  };

  // TODO
  const refreshJwt: UserContext["refreshJwt"] = async () => {};

  return (
    <UserStore.Provider
      value={{
        state,
        setJwtData,
        refreshJwt,
        signIn,
        signOut,
        setUserDetails,
      }}
    >
      {children}
    </UserStore.Provider>
  );
};

export { UserContextProvider, useUserStore, UserStore };
export type { UserContext };
