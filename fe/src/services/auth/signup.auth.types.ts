export interface SignUpBody {
  email: string;
  username: string;
  password: string;
}

export type SignupResponseSuccess = {
  data: {
    username: string;
    email: string;
    password: string;
    id: string;
  };
};

export type SignUpResponseLoadingState = {
  state: "loading";
};

export type SignUpResponseFailedState = {
  state: "failed";
  message: string;
  code: number;
};

export type SignPpResponseSuccessState = {
  state: "success";
  data: {
    username: string;
    email: string;
    password: string;
    id: string;
  };
};

export type SignupResponse =
  | SignUpResponseFailedState
  | SignPpResponseSuccessState
  | SignUpResponseLoadingState;
