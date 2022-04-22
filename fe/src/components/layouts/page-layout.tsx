import { IPostAndComments } from "../../types/posts";
import { IComment } from "../../types/coments";

interface PageLayoutProps {
  post: IPostAndComments | null;
}

// deals with presentation
const PageLayout = ({ post }: PageLayoutProps): JSX.Element => {
  const comments: IComment[] | undefined = post?.comments;

  const renderPost = (): JSX.Element | null => {
    if (!post) {
      return null;
    }

    return (
      <div>
        <div>
          <h1>{post?.title}</h1>
          <hr />
          <p>{post.body}</p>
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
    <div>
      <div>{renderPost()}</div>
      <div>{renderComments()}</div>
    </div>
  );
};

export default PageLayout;
