import { IComment } from "../../types/coments";

interface CommentEditProps {
  loading: boolean;
  data: IComment;
  error: string | undefined;
}

export const EditComment = ({
  loading,
  error,
  data,
}: CommentEditProps): JSX.Element => {
  if (loading) {
    return <div>{"loading"}</div>;
  }

  if (error) {
    return <div>{"handle error"}</div>;
  }

  return (
    <div className="py-4 px-5">
      <div>EDIT COMMENT</div>
    </div>
  );
};
