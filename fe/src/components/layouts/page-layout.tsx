import { LoadingSpinner } from "../spinner";

import { IPostAndComments } from "../../types/posts";
import { IComment } from "../../types/coments";

interface PageLayoutProps {
  loading: boolean;
  post: IPostAndComments | null;
  error: string | null;
}

/** presentation */
const PageLayout = ({ loading, post, error }: PageLayoutProps): JSX.Element => {
  const comments: IComment[] | undefined = post?.comments;

  const renderPost = (): JSX.Element | null => {
    if (loading) {
      return <LoadingSpinner />;
    }

    if (error) {
      return <div>Handle error state</div>;
    }

    if (!post) {
      return <div>Post not found</div>;
    }

    return (
      <div>
        <div></div>

        <div className="mx-4 my-4 border-2 border-slate-400 rounded-md">
          <div className="px-6 py-6 ">
            <h1 className="font-mono capitalize font-semibold text-xl">
              {post?.title}
            </h1>

            <div className="py-4 px-6">
              <img
                className="object-contain h-96 h-48 rounded-md"
                src="https://s1.1zoom.me/b3559/165/Texture_Stones_Many_574636_600x800.jpg"
                alt="story_img"
              />
            </div>

            <div className="py-4">
              <p>{post.body}</p>
            </div>
          </div>
          <div className="py-4 px-5">COMMENTS</div>
        </div>
      </div>
    );
  };

  const renderComments = (): JSX.Element | null => {
    if (!comments) {
      return null;
    }

    return (
      <div>
        {comments.map((c) => (
          <div key={c.id}>{c.body}</div>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto">
      <div className="mx-3 my-3">{renderPost()}</div>
      {/* <div>{renderComments()}</div> */}
    </div>
  );
};

export default PageLayout;
