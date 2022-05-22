import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import NewPost from "../post-components/post-new";

const PageLayout = (): JSX.Element => {
  const createNewPost = (data: any) => {
    console.log(data);
  };

  return (
    <div className="container mx-auto">
      <div className="mx-3 my-3">
        <NewPost
          loading={false}
          error={undefined}
          createEntityHandler={createNewPost}
        />
      </div>
    </div>
  );
};

export default PageLayout;
