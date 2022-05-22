import { ReactElement } from "react";

import { CurrentView, useCurrentView } from "../../hooks/use-current-view.hook";
import { IPostAndComments } from "../../types/posts";
import LoadingSpinner from "../spinner";
import EditPost from "../post-components/edit";
import ViewPost from "../post-components/view";
import { usePostContext } from "../../stores/post-store/use-post-context-hook";

export const PostWrapper = (): JSX.Element => {
  const [currentView, setCurrentView] = useCurrentView();
  const postContext = usePostContext();
  const post = postContext?.state.post;
  const loading = postContext?.state.loading;
  const error = postContext?.state.error;

  const updatePost = async (updatePostDto: any) => {
    const { id } = post as IPostAndComments;

    await postContext?.updatePost(id, updatePostDto);

    setCurrentView(CurrentView.View);
  };

  const components: Record<CurrentView, ReactElement> = {
    [CurrentView.View]: (
      <ViewPost
        loading={false}
        post={post}
        error={undefined}
        updateCurrentViewHandler={() => setCurrentView(CurrentView.Edit)}
      />
    ),
    [CurrentView.Edit]: (
      <EditPost
        loading={false}
        post={post}
        error={undefined}
        updateCurrentViewHandler={() => setCurrentView(CurrentView.View)}
        updateEntityHandler={updatePost}
      />
    ),
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Handle error state</div>;
  }

  return (
    <div className="container some general wrapper">
      <div className="some container">
        <div>{components[currentView]}</div>
      </div>
    </div>
  );
};
