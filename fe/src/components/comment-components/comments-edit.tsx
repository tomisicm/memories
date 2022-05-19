import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { IComment } from "../../types/coments";
import {
  CommentForm,
  CommentFormFields,
  validationSchema,
} from "./comment-form.data";

interface CommentEditProps {
  loading: boolean;
  data: IComment;
  error: string | undefined;
  onClickHandler: (e: any) => void;
}

export const EditComment = ({
  loading,
  error,
  data,
  onClickHandler,
}: CommentEditProps): JSX.Element => {
  const [editState, setEditState] = useState(false);

  const {
    register,
    handleSubmit: handleSubmitEvent,
    formState: { errors },
    getValues,
  } = useForm<CommentForm>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      comment: data.body,
    },
  });

  const handleUpdateComment = () => {
    const values = getValues();
    console.log(values);
  };

  if (loading) {
    return <div>{"loading"}</div>;
  }

  if (error) {
    return <div>{"handle error"}</div>;
  }

  const renderViewComment = () => (
    <div>
      <div>{data.body}</div>
      <div className="flex justify-end">
        <button
          className="mx-2 text-base font-semibold bg-gray-800 text-white 
  rounded-lg px-6 py-1 block shadow-xl hover:text-white hover:bg-black"
          onClick={() => setEditState(true)}
        >
          Edit
        </button>
      </div>
    </div>
  );

  const renderEditComment = () => (
    <div>
      <div className="mb-1">
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
          className="mx-2 text-base font-semibold bg-gray-400 text-white 
  rounded-lg px-6 py-1 block shadow-xl hover:text-white hover:bg-black"
          onClick={() => setEditState(false)}
        >
          Cancel
        </button>
        <button
          className="mx-2 text-base font-semibold bg-gray-800 text-white 
  rounded-lg px-6 py-1 block shadow-xl hover:text-white hover:bg-black"
          onClick={handleUpdateComment}
        >
          Update
        </button>
      </div>
    </div>
  );

  return (
    <div className="py-4 px-5 flex">
      <div className="w-1/8 flex-col">
        <div className="pr-5">
          <img
            className="h-12 w-12"
            src="https://i1.wp.com/ggrmlawfirm.com/wp-content/uploads/avatar-placeholder.png?fit=256%2C256&ssl=1"
            alt={"avatar"}
          />
        </div>
      </div>

      <div className="w-3/4 flex-col">
        <div className="mb-1 font-semibold">{data.author?.username}</div>

        {editState ? renderEditComment() : renderViewComment()}
      </div>
    </div>
  );
};
