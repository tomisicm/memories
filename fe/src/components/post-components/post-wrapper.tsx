import { LoadingSpinner } from "../spinner";
import EditPost from "../post-components/edit";
import ViewPost from "../post-components/view";

import { CurrentView, useCurrentView } from "../../hooks/use-current-view.hook";
import { ReactElement } from "react";

interface PostWrapperProps {
  loading: boolean;
  post: any;
  error: undefined | string;
}

export const PostWrapper = ({ loading, post, error }: any): JSX.Element => {
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

  if (!post) {
    return <div>Post not found, go back</div>;
  }

  return (
    <div className="container some general wrapper">
      <div className="some container">
        <div>{components[currentView]}</div>
      </div>
    </div>
  );
};
