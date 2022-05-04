const SET_USER_ACCESS_TOKEN = "SET_USER_ACCESS_TOKEN";
const SET_USER_JWT = "SET_USER_JWT";
const SET_LOGGED_IN = "SET_LOGGED_IN";
const SET_USER_DETAILS = "SET_USER_DETAILS";

interface UserState {
  userJwt: string | null;
  loggedIn: boolean | null;
  userDetails: UserDetails;
}

interface UserDetails {
  userId: string | null;
  email: string;
  username: string;
}

interface SetUserDetailsPayload {
  userDetails: UserDetails;
}

interface SetUserAccessTokenActionPayload {
  userAccessToken: string;
}

interface SetUserJwtActionPayload {
  userJwt: string | null;
}

interface SetLoggedInActionPayload {
  loggedIn: boolean | null;
}

interface SetUserIdActionPayload {
  userId: string | null;
}

interface SetUserDetailsAction {
  type: typeof SET_USER_DETAILS;
  payload: SetUserDetailsPayload;
}

interface SetUserAccessTokenAction {
  type: typeof SET_USER_ACCESS_TOKEN;
  payload: SetUserAccessTokenActionPayload;
}

interface SetUserJwtAction {
  type: typeof SET_USER_JWT;
  payload: SetUserJwtActionPayload;
}

interface SetLoggedInAction {
  type: typeof SET_LOGGED_IN;
  payload: SetLoggedInActionPayload;
}

export { SET_USER_ACCESS_TOKEN, SET_USER_JWT, SET_LOGGED_IN, SET_USER_DETAILS };

export type {
  SetUserAccessTokenAction,
  SetUserAccessTokenActionPayload,
  SetUserJwtAction,
  SetUserJwtActionPayload,
  SetLoggedInAction,
  SetLoggedInActionPayload,
  SetUserIdActionPayload,
  SetUserDetailsPayload,
  SetUserDetailsAction,
  UserState,
  UserDetails,
};
