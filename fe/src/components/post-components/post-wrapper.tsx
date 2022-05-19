import { ReactElement } from "react";

import { CurrentView, useCurrentView } from "../../hooks/use-current-view.hook";
import { IPostAndComments } from "../../types/posts";
import LoadingSpinner from "../spinner";
import EditPost from "../post-components/edit";
import ViewPost from "../post-components/view";

interface PostWrapperProps {
  loading: boolean;
  post: IPostAndComments;
  error: null | string;
}

export const PostWrapper = ({
  loading,
  post,
  error,
}: PostWrapperProps): JSX.Element => {
  const [currentView, setCurrentView] = useCurrentView();

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
