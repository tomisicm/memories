import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import postsService from "./../services/posts/posts-service";
import { usePostsContext } from "../stores/posts-store/use-posts-context-hook";
import { IPost, IPostAndComments } from "../types/posts";
import { IComment } from "../types/coments";
import PageLayout from "../components/layouts/page-layout";

interface IPostWithComments {
  comments: IComment[];
}

// deals with fetching logic
const Page = (): JSX.Element => {
  const [state, setState] = useState<IPostAndComments | null>(null);
  const postsState = usePostsContext();

  let { id } = useParams() as { id: string };

  useEffect(() => {
    // TODO: deal with comments if possible
    // const findOrFetchPost = async () => {
    //   const isFound = findPost(postsState?.state?.posts, id);

    //   if (isFound) {
    //     setState(isFound);
    //   } else {
    //     fetchPost();
    //   }
    // };

    const fetchPost = async () => {
      const postData = await postsService.get(id);

      if (postData) {
        setState(postData);
      }
    };

    // findOrFetchPost();
    fetchPost();
  }, [id]);

  return <PageLayout post={state} />;
};

// function findPost(posts: IPost[] | undefined, id: string): IPost | false {
//   if (!posts) return false;

//   const isFound = posts.find((p) => p.id.toString() === id);

//   return isFound ?? false;
// }

export default Page;
