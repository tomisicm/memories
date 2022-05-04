import { useEffect } from "react";
import { Link } from "react-router-dom";

import { MEMORIES_PAGE } from "../constants";
import { usePostsContext } from "../stores/posts-store/use-posts-context-hook";
import { useUserStore } from "../stores/user-store/user-store";
import { IPost } from "../types/posts";

const Page = (): JSX.Element => {
  const postsState = usePostsContext();
  const posts: IPost[] = postsState?.state?.posts;
  const privatePosts: IPost[] = []; // TODO: filter
  const userDetails = useUserStore();

  useEffect(() => {
    postsState?.fetchDataFeed();
  }, [userDetails.state.loggedIn]);

  const renderPosts = (posts: IPost[]): JSX.Element[] | JSX.Element | null => {
    if (!posts?.length) {
      return <div className="mx-6 my-6">No available memories</div>;
    }

    return (
      <div className="mx-4 mx-3">
        <table className="table-fixed">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post: IPost) => {
              return (
                <tr key={post.id}>
                  <td>{post.title}</td>
                  <td>{post.authorId}</td>
                  <td>{post.createdAt}</td>
                  <td>
                    <Link to={`/posts/${post.id}`}> Open Memory </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <>
      <div className="mx-4 my-4">
        <h2>{MEMORIES_PAGE.MEMORIES}</h2>
        <div>{renderPosts(posts)}</div>
      </div>

      <div className="mx-4 my-4">
        <h2>{MEMORIES_PAGE.PERSONAL_MEMORIES}</h2>
        <div>{renderPosts(privatePosts)}</div>
      </div>
    </>
  );
};

export default Page;
