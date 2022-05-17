import { useState } from "react";

import { useUsersContext } from "../stores/user-store/use-user-context-hook";
import authService from "../services/auth/auth.service";
import SigninForm from "../components/signin-form";
import { UserSigninForm } from "../components/form-data/signin-form-data";

export interface SignupUserFormState {
  loading: boolean;
  data: any;
  error: undefined | string;
}

const Page = (): JSX.Element => {
  const initialFormState: SignupUserFormState = {
    loading: false,
    data: {},
    error: undefined,
  };

  const userState = useUsersContext();

  const [userFormState, setUserFormState] = useState(initialFormState);

  const loginUserHandler = async (userCredentials: UserSigninForm) => {
    try {
      const response = await authService.signin(userCredentials);

      switch (response.state) {
        case "loading": {
          setUserFormState({ ...userFormState, loading: true });
          break;
        }
        case "failed": {
          setUserFormState({
            data: {},
            error: response.message,
            loading: false,
          });
          break;
        }
        case "success": {
          setUserFormState({
            ...userFormState,
            data: response.data,
            loading: false,
          });

          userState.signIn(response.data.accessToken);
          break;
        }
      }
    } catch (e) {
      setUserFormState({
        data: {},
        error: "Something went wrong!",
        loading: false,
      });
    } finally {
      setUserFormState({ ...userFormState, loading: false });
    }
  };

  return (
    <div className="bg-gray-200 relative min-h-screen antialiased border-t-8 border-black">
      <SigninForm handleSubmit={loginUserHandler} formData={userFormState} />
    </div>
  );
};

export default Page;
