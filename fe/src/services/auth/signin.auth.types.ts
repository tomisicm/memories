// ???
export type SignInResponseSuccess = {
  data: {
    accessToken: string;
  };
};

export type SignInResponseLoadingState = {
  state: "loading";
};

export type SignInResponseFailedState = {
  state: "failed";
  message: string;
  code: number;
};

export type SignInResponseSuccessState = {
  state: "success";
  data: {
    accessToken: string;
  };
};

export interface SignInBody {
  username: string;
  password: string;
}

export type SignInResponse =
  | SignInResponseLoadingState
  | SignInResponseFailedState
  | SignInResponseSuccessState;
