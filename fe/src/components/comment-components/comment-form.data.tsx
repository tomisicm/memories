import * as Yup from "yup";

export type CommentForm = {
  comment: string;
};

export enum CommentFormFields {
  comment = "comment",
}

export const defaultCommentValues: Record<CommentFormFields, string> = {
  [CommentFormFields.comment]: "",
};

export const validationSchema = Yup.object().shape({
  comment: Yup.string().min(1).max(255).required("Comment is required"),
});
