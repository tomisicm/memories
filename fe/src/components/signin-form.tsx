import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  defaultSignInValues,
  SignInFormFields,
  UserSigninForm,
  validationSchema,
} from "./form-data/signin-form-data";
import { SignupUserFormState } from "../pages/signin";

interface LoginFormProps {
  handleSubmit: (values: UserSigninForm) => void;
  formData: SignupUserFormState;
}

const LoginForm = ({ handleSubmit, formData }: LoginFormProps): JSX.Element => {
  const onSubmit = (values: UserSigninForm) => {
    handleSubmit(values);
  };

  const {
    register,
    handleSubmit: handleSubmitEvent,
    reset,
    formState: { errors },
  } = useForm<UserSigninForm>({
    resolver: yupResolver(validationSchema),
  });

  return (
    <div>
      <div>{JSON.stringify(formData)}</div>

      <div className="max-w-md mx-auto px-6 my-6">
        <h3 className="mb-6 font-bold text-lg">Sign In</h3>

        <form onSubmit={handleSubmitEvent(onSubmit)}>
          <div className="flex flex-col mb-4">
            <label
              htmlFor="username"
              className="mb-2 font-bold text-grey-darkest"
            >
              Username
            </label>
            <input
              className="py-2 px-3 text-grey-darkest"
              placeholder="Username"
              defaultValue={defaultSignInValues.username as string}
              {...register(SignInFormFields.username)}
            />
            <small
              className={`${errors.username?.message ? "text-red-500" : ""}`}
            >
              {errors.username?.message}
            </small>
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="email" className="mb-2 font-bold text-grey-darkest">
              Email
            </label>
            <input
              placeholder="Email"
              className="py-2 px-3 text-grey-darkest"
              defaultValue={defaultSignInValues.email as string}
              {...register(SignInFormFields.email)}
            />
            <small className={`${errors.email?.message ? "text-red-500" : ""}`}>
              {errors.email?.message}
            </small>
          </div>

          <div className="flex flex-col mb-4">
            <label
              htmlFor="password"
              className="mb-2 font-bold text-grey-darkest"
            >
              Password
            </label>
            <input
              placeholder="Password"
              className="py-2 px-3 text-grey-darkest"
              defaultValue={defaultSignInValues.password as string}
              {...register(SignInFormFields.password)}
            />
            <small
              className={`${errors.password?.message ? "text-red-500" : ""}`}
            >
              {errors.password?.message}
            </small>
          </div>

          <div className="flex flex-col mb-4">
            <button
              className="text-base font-semibold bg-gray-800 text-white 
      rounded-lg px-6 py-1 block shadow-xl hover:text-white hover:bg-black"
              type="submit"
              disabled={false}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
