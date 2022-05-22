import * as Yup from "yup";

export enum Status {
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

export const defaultPostFormValues: Record<PostFormFields, string | Status> = {
  [PostFormFields.title]: "",
  [PostFormFields.body]: "",
  [PostFormFields.status]: Status.public as Status,
};

export const validationSchema = Yup.object().shape({
  title: Yup.string().min(1).max(64).required("Title is required"),
  body: Yup.string().min(1).max(255).required("Content is required"),
  status: Yup.string().oneOf([Status.public, Status.private]).optional(),
});
