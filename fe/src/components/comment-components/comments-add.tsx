import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { IComment } from "../../types/coments";
import {
  CommentForm,
  CommentFormFields,
  validationSchema,
} from "./comment-form.data";

// TODO delete data?
interface AddCommentProps {
  loading: boolean;
  data: IComment;
  error: string | undefined;
  onClickHandler: (e: any) => void;
}

export const AddComment = ({
  loading,
  error,
  data,
  onClickHandler,
}: AddCommentProps): JSX.Element => {
  const {
    register,
    handleSubmit: handleSubmitEvent,
    formState: { errors },
  } = useForm<CommentForm>({
    resolver: yupResolver(validationSchema),
  });

  if (loading) {
    return <div>{"loading"}</div>;
  }

  if (error) {
    return <div>{"handle error"}</div>;
  }

  const onSubmit = (values: CommentForm) => {
    onClickHandler(values.comment);
  };

  return (
    <div className="py-4 px-5">
      <form onSubmit={handleSubmitEvent(onSubmit)}>
        <div className="flex flex-col my-2">
          <input
            type="text"
            className="w-full focus:outline-none focus:border-b-2 border-slate-900"
            placeholder="Add new comment... "
            {...register(CommentFormFields.comment)}
          />
          <small className={`${errors.comment?.message ? "text-red-500" : ""}`}>
            {errors.comment?.message}
          </small>
        </div>
        <div className="flex justify-end">
          <button
            className="text-base font-semibold bg-gray-800 text-white 
      rounded-lg px-6 py-1 block shadow-xl hover:text-white hover:bg-black"
            type="submit"
          >
            Add comment
          </button>
        </div>
      </form>
    </div>
  );
};
