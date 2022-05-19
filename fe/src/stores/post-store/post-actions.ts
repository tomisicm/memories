import { Dispatch } from "react";

import { SetPostAction, SetPostActionPayload, SET_POST } from "./post-types";

const setPostAction = (
  payload: SetPostActionPayload,
  dispatch: Dispatch<SetPostAction>
): void => {
  dispatch({ type: SET_POST, payload: payload });
};

export { setPostAction };
