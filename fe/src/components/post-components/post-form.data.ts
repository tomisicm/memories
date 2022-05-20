import * as Yup from "yup";

enum Status {
  private = "private",
  public = "public",
}

export type PostForm = {
  title: string;
  body: string;
  status: Status;
};

export enum PostFormFields {
  title = "title",
  body = "body",
  status = "status",
}

export const defaultPostFormValues: Record<PostFormFields, string> = {
  [PostFormFields.title]: "",
  [PostFormFields.body]: "",
  [PostFormFields.status]: "public",
};

export const validationSchema = Yup.object().shape({
  title: Yup.string().min(1).max(64).required("Title is required"),
  body: Yup.string().min(1).max(255).required("Content is required"),
  status: Yup.string().oneOf(["public", "private"]).optional(),
});
