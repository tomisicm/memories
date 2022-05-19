import commentsService from "../../services/comments/comments.service";
import { useUserStore } from "../../stores/user-store/user-store";
import { IComment, Status } from "../../types/coments";
import { EditComment } from "./comments-edit";
import ViewComment from "./comments-view";

interface CommentsListProps {
  loading: boolean;
  data: IComment[] | undefined;
  error: string | undefined | null;
  onClickHandler: (e: any) => void;
}

export const CommentsList = ({
  loading,
  error,
  data,
  onClickHandler,
}: CommentsListProps): JSX.Element => {
  const {
    state: { userDetails },
  } = useUserStore();

  const processedData = data?.map((comment) => ({
    ...comment,
    isAuthor: comment.authorId === userDetails?.userId,
  }));

  // console.log(processedData);

  if (loading) {
    return <div>{"loading"}</div>;
  }

  if (error) {
    return <div>{"handle error"}</div>;
  }

  if (!processedData?.length) {
    return <div className="py-4 px-5">{"no comments, be the first"}</div>;
  }

  return (
    <div className="py-4 px-5">
      <div className="mb-2">Comments:</div>

      <div>
        {processedData.map((comment) =>
          comment.isAuthor ? (
            <EditComment
              key={comment.id}
              loading={false}
              data={comment}
              error={undefined}
              onClickHandler={onClickHandler}
            />
          ) : (
            <ViewComment
              key={comment.id}
              loading={false}
              data={comment}
              error={undefined}
            />
          )
        )}
      </div>
    </div>
  );
};
