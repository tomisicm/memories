import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { CommentsList } from "../comment-components/comments-list";
import { AddComment } from "../comment-components/comments-add";
import { PostWrapper } from "../post-components/post-wrapper";
import commentService from "../../services/comments/comments.service";
import { usePostContext } from "../../stores/post-store/use-post-context-hook";
import { PostState } from "../../stores/post-store/post-types";

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

const PageLayout = (): JSX.Element => {
  const { id } = useParams() as { id: string };
  const postContext = usePostContext();

  const { error, post, loading } = postContext?.state || ({} as PostState);

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

  useEffect(() => {
    const fetchPost = async () => {
      postContext?.fetchPostFeed(id);
    };

    fetchPost();
  }, [id]);

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

  const handleUpdateComment = async (comment: any) => {
    // TODO
  };

  if (!post) {
    return <div>Post not found, go back</div>;
  }

  return (
    <div className="container mx-auto">
      <div className="mx-3 my-3">
        <PostWrapper loading={loading} post={post} error={error} />
      </div>

      <div className="container px-8">
        <AddComment
          loading={newCommentFormState.loading}
          data={newCommentFormState.data}
          error={newCommentFormState.error}
          onClickHandler={handleAddNewComment}
        />
        <CommentsList
          loading={loading}
          data={post?.comments}
          error={error}
          onClickHandler={handleUpdateComment}
        />
      </div>
    </div>
  );
};

export default PageLayout;
