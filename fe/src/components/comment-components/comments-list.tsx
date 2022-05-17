import { IComment, Status } from "../../types/coments";
import { EditComment } from "./comments-edit";

interface CommentsListProps {
  loading: boolean;
  data: IComment[] | undefined;
  error: string | undefined;
  onClickHandler: (e: any) => void;
}

const dummyComment: IComment = {
  id: "id",
  postId: "postId",
  body: "body",
  authorId: "authorId",
  status: Status.PUBLIC,
  deletedAt: undefined,
  createdAt: new Date(),
};

export const CommentsList = ({
  loading,
  error,
  data,
  onClickHandler,
}: CommentsListProps): JSX.Element => {
  if (loading) {
    return <div>{"loading"}</div>;
  }

  if (error) {
    return <div>{"handle error"}</div>;
  }

  if (!data?.length) {
    return <div className="py-4 px-5">{"no comments, be the first"}</div>;
  }

  return (
    <div className="py-4 px-5">
      <div>COMMENTS:</div>

      <EditComment loading={false} data={dummyComment} error={undefined} />

      <div>
        {data.map((c) => (
          <div key={c.id}>{c.body}</div>
        ))}
      </div>
    </div>
  );
};
