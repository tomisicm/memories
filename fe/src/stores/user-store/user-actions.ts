import { Dispatch } from "react";

import {
  SetLoggedInAction,
  SET_USER_JWT,
  SetUserJwtAction,
  SET_LOGGED_IN,
  UserDetails,
  SetUserDetailsAction,
  SET_USER_DETAILS,
} from "./user-types";

export const setUserJwtAction = (
  userJwt: string | null,
  dispatch: Dispatch<SetUserJwtAction>
): void => {
  dispatch({
    type: SET_USER_JWT,
    payload: { userJwt },
  });
};

export const setUserDetailsAction = (
  userDetails: UserDetails,
  dispatch: Dispatch<SetUserDetailsAction>
): void =>
  dispatch({
    type: SET_USER_DETAILS,
    payload: { userDetails },
  });

export const setLoggedInAction = (
  loggedIn: boolean | null,
  dispatch: Dispatch<SetLoggedInAction>
): void =>
  dispatch({
    type: SET_LOGGED_IN,
    payload: { loggedIn },
  });
