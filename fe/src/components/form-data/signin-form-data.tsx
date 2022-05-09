import * as Yup from "yup";

export type UserSigninForm = {
  username: string;
  password: string;
  email: string;
};

export enum SignInFormFields {
  email = "email",
  username = "username",
  password = "password",
}

export const defaultSignInValues: Record<SignInFormFields, string> = {
  [SignInFormFields.email]: "",
  [SignInFormFields.username]: "",
  [SignInFormFields.password]: "",
};

export const validationSchema = Yup.object().shape({
  username: Yup.string().min(4).required("Username Terms is required"),
  password: Yup.string().min(8).required("Password Terms is required"),
  email: Yup.string().required("Email is required").email("Email is invalid"),
});
