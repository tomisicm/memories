import { IComment } from "../../types/coments";

interface CommentViewProps {
  loading: boolean;
  data: IComment;
  error: string | undefined;
}

const ViewComment = ({
  loading,
  error,
  data,
}: CommentViewProps): JSX.Element => {
  return (
    <div className="py-4 px-5 flex">
      <div className="w-1/8 flex-col">
        <div className="pr-5">
          <img
            className="h-12 w-12"
            src="https://i1.wp.com/ggrmlawfirm.com/wp-content/uploads/avatar-placeholder.png?fit=256%2C256&ssl=1"
            alt={"avatar"}
          />
        </div>
      </div>

      <div className="w-3/4 flex-col">
        <div className="mb-2 font-semibold">{data?.author?.username}</div>
        <div>{data?.body}</div>
      </div>
    </div>
  );
};

export default ViewComment;
