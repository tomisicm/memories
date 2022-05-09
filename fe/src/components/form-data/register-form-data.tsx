import * as Yup from "yup";

export type UserSignupForm = {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  terms: boolean;
};

export enum SignUpFormFields {
  username = "username",
  password = "password",
  confirmPassword = "confirmPassword",
  email = "email",
  terms = "terms",
}

export const defaultSignUpValues: Record<SignUpFormFields, string | boolean> = {
  [SignUpFormFields.username]: "",
  [SignUpFormFields.password]: "",
  [SignUpFormFields.confirmPassword]: "",
  [SignUpFormFields.email]: "",
  [SignUpFormFields.terms]: false,
};

export const validationSchema = Yup.object().shape({
  username: Yup.string().min(4).required("Username Terms is required"),
  password: Yup.string().min(8).required("Password Terms is required"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
  email: Yup.string().required("Email is required").email("Email is invalid"),
  terms: Yup.boolean().oneOf([true], "Accept Terms is required"),
});
