import {
  SetUserAccessTokenAction,
  UserState,
  SET_LOGGED_IN,
  SetUserJwtAction,
  SET_USER_JWT,
  SetLoggedInAction,
  SET_USER_DETAILS,
  SetUserDetailsAction,
} from "./user-types";

import {
  getValueForKeyInSessionStorage,
  BROWSER_KEY_SIGNIN,
  BROWSER_KEY_SIGNED_IN,
  BROWSER_KEY_JWT,
} from "../../services/shared/session-storage.service";

// const initialUserState: UserState = {
//   userJwt: null,
//   loggedIn: null,
//   userDetails: {
//     userId: null,
//     username: "",
//     email: "",
//   },
// };

// TODO: initialize initial state
const getInitialUserState = (): UserState => {
  const userJwt = getValueForKeyInSessionStorage(BROWSER_KEY_JWT);
  const signedIn = getValueForKeyInSessionStorage(BROWSER_KEY_SIGNED_IN);
  const userDetails = getValueForKeyInSessionStorage(BROWSER_KEY_SIGNIN);

  return {
    userJwt: userJwt || null,
    loggedIn: signedIn || null,
    userDetails: {
      userId: null,
      username: "",
      email: "",
      ...userDetails,
    },
  };
};

const initialUserState = getInitialUserState();

type UserAction =
  | SetUserAccessTokenAction
  | SetLoggedInAction
  | SetUserJwtAction
  | SetUserDetailsAction;

const userReducer = (
  state = initialUserState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case SET_USER_DETAILS:
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          ...action.payload.userDetails,
        },
      };
    case SET_USER_JWT:
      return {
        ...state,
        ...action.payload,
      };
    case SET_LOGGED_IN:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export { userReducer, initialUserState };
