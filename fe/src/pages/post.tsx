import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import postsService from "./../services/posts/posts-service";
import { IPostAndComments } from "../types/posts";
import PageLayout from "../components/layouts/page-layout";

// deals with fetching logic

interface PostState {
  loading: boolean;
  post: IPostAndComments | null;
  error: string | null;
}

const initialPostState: PostState = {
  loading: true,
  post: null,
  error: null,
};

const Page = (): JSX.Element => {
  const [state, setState] = useState<PostState>(initialPostState);

  let { id } = useParams() as { id: string };

  useEffect(() => {
    const fetchPost = async () => {
      const postData = await postsService.get(id);

      if (postData) {
        setState({ loading: false, post: postData, error: null });
      } else {
        setState({ loading: false, post: null, error: "Something went wrong" });
      }
    };

    fetchPost();
  }, [id]);

  return (
    <PageLayout
      post={state?.post}
      loading={state.loading}
      error={state.error}
    />
  );
};

export default Page;
