import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { PostForm, PostFormFields, Status } from "./post-form.data";
import { validationSchema, defaultPostFormValues } from "./post-form.data";

interface NewPostProps {
  loading: boolean;
  post?: any;
  error: undefined | string;
  createEntityHandler: (post: any) => void;
}

const NewPost = ({
  loading,
  post,
  error,
  createEntityHandler,
}: NewPostProps): JSX.Element => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit: handleSubmitEvent,
    formState: { errors },
  } = useForm<PostForm>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: "",
      body: "",
      status: Status.public,
    },
  });

  const onSubmit = (data: PostForm) => {
    createEntityHandler(data);
  };

  if (loading) {
    // handle loading
  }

  if (error) {
    // handle error
  }

  return (
    <div className="mx-4 my-4 border-2 border-slate-400 rounded-md">
      <div className="px-6 py-6">
        <form onSubmit={handleSubmitEvent(onSubmit)}>
          <div className="flex flex-col my-2">
            <input
              type="text"
              className="w-full focus:outline-none focus:border-b-2 border-slate-900"
              placeholder="Whats on your mind..."
              {...register(PostFormFields.title)}
            />
            <small className={`${errors.title?.message ? "text-red-500" : ""}`}>
              {errors.title?.message}
            </small>
          </div>

          <div className="py-4 px-6 w-96">
            <img
              className="object-contain h-48 rounded-md"
              src="https://s1.1zoom.me/b3559/165/Texture_Stones_Many_574636_600x800.jpg"
              alt="story_img"
            />
          </div>

          <div className="py-4">
            <input
              type="text"
              className="w-full focus:outline-none focus:border-b-2 border-slate-900"
              placeholder="Whats on your mind..."
              {...register(PostFormFields.body)}
            />
            <small className={`${errors.body?.message ? "text-red-500" : ""}`}>
              {errors.body?.message}
            </small>
          </div>

          <div className="flex justify-end">
            <button
              className="mx-2 text-base font-semibold bg-gray-400 text-white  rounded-lg px-6 py-1 block shadow-xl hover:text-white hover:bg-black"
              onClick={() => navigate("/posts")}
            >
              Cancel
            </button>

            <button
              className="text-base font-semibold bg-gray-800 text-white 
      rounded-lg px-6 py-1 block shadow-xl hover:text-white hover:bg-black"
            >
              Publish Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPost;
