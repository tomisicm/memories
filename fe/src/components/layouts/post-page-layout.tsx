import { ReactElement, useState } from "react";

import { LoadingSpinner } from "../spinner";
import { CommentsList } from "../comment-components/comments-list";
import { AddComment } from "../comment-components/add-new/comments-add-new";
import { PostWrapper } from "../post-components/post-wrapper";
import commentService from "../../services/comments/comments.service";
import { IPostAndComments } from "../../types/posts";
import { IComment } from "../../types/coments";

interface PageLayoutProps {
  loading: boolean;
  post: IPostAndComments | null;
  error: string | null;
}

export interface NewCommentFormState {
  loading: boolean;
  data: any;
  error: undefined | string;
}

export interface UpdateCommentFormState {
  loading: boolean;
  data: any;
  error: undefined | string;
}

/** presentation */
const PageLayout = ({
  loading: postLoading,
  post,
  error: postError,
}: PageLayoutProps): JSX.Element => {
  const comments: IComment[] | undefined = post?.comments;

  const initialNewCommentFormState: NewCommentFormState = {
    loading: false,
    data: {},
    error: undefined,
  };

  const initialUpdateCommentFormState: UpdateCommentFormState = {
    loading: false,
    data: {},
    error: undefined,
  };

  const [newCommentFormState, setNewCommentFormState] =
    useState<NewCommentFormState>(initialNewCommentFormState);

  const [updateCommentFormState, setUpdateCommentFormState] =
    useState<NewCommentFormState>(initialUpdateCommentFormState);

  const handleAddNewComment = async (newComment: string) => {
    if (!post) return;

    try {
      const response = await commentService.create({
        body: newComment,
        postId: post.id,
        status: "public",
      });
      switch (response.state) {
        case "loading": {
          setNewCommentFormState({ ...newCommentFormState, loading: true });
          break;
        }
        case "failed": {
          setNewCommentFormState({
            data: {},
            error: response.message,
            loading: false,
          });
          break;
        }
        case "success": {
          setNewCommentFormState({
            ...newCommentFormState,
            data: response.data,
            loading: false,
          });
          break;
        }
      }
    } catch (e) {
      setNewCommentFormState({
        data: {},
        error: "Something went wrong!",
        loading: false,
      });
    } finally {
      setNewCommentFormState({ ...newCommentFormState, loading: false });
    }
  };

  const handleUpdateNewComment = async (comment: any) => {
    // TODO
  };

  return (
    <div className="container mx-auto">
      <div className="mx-3 my-3">
        <PostWrapper loading={postLoading} post={post} error={postError} />
      </div>

      <div className="container px-8">
        <AddComment
          loading={newCommentFormState.loading}
          data={newCommentFormState.data}
          error={newCommentFormState.error}
          onClickHandler={handleAddNewComment}
        />
        <CommentsList
          loading={newCommentFormState.loading}
          data={newCommentFormState.data}
          error={newCommentFormState.error}
          onClickHandler={handleUpdateNewComment}
        />
      </div>
    </div>
  );
};

export default PageLayout;
