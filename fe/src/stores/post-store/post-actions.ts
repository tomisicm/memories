import { Dispatch } from "react";

import {
  SetPostAction,
  SetPostActionPayload,
  SET_POST,
  UpdatePostAction,
  UpdatePostActionPayload,
  UPDATE_POST,
} from "./post-types";

const setPostAction = (
  payload: SetPostActionPayload,
  dispatch: Dispatch<SetPostAction>
): void => {
  dispatch({ type: SET_POST, payload: payload });
};

const updatePostAction = (
  payload: UpdatePostActionPayload,
  dispatch: Dispatch<UpdatePostAction>
): void => {
  dispatch({ type: UPDATE_POST, payload: payload });
};

// TODO:
// const deletePostAction = (
//   payload: UpdatePostActionPayload,
//   dispatch: Dispatch<UpdatePostAction>
// ): void => {
//   dispatch({ type: UPDATE_POST, payload: payload });
// };

export { setPostAction, updatePostAction };
