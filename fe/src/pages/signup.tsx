import { useState } from "react";

import authService from "../services/auth/auth.service";
import { UserSigninForm } from "../components/form-data/signin-form-data";
import SignupForm from "../components/signup-form";

export interface RegisterUserFormState {
  loading: boolean;
  data: any;
  error: undefined | string;
}

const Page = (): JSX.Element => {
  const initialFormState: RegisterUserFormState = {
    loading: false,
    data: {},
    error: undefined,
  };

  const [userFormState, setUserFormState] = useState(initialFormState);

  const registerUser = async (data: UserSigninForm) => {
    const response = await authService.signup(data);

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
          error: undefined,
          data: response.data,
          loading: false,
        });
        break;
      }
    }
  };

  const handleSubmit = (data: any) => {
    registerUser(data);
    console.log(userFormState);
    // TODO: signin & redirect
  };

  return (
    <div className="bg-gray-200 relative min-h-screen antialiased border-t-8 border-black">
      <SignupForm handleSubmit={handleSubmit} formData={userFormState} />
    </div>
  );
};

export default Page;
