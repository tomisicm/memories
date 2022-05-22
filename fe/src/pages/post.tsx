import PageLayout from "../components/layouts/layout-post-page";
import { PostContextProvider } from "../stores/post-store/post-store";

const Page = (): JSX.Element => {
  return (
    <PostContextProvider>
      <PageLayout />
    </PostContextProvider>
  );
};

export default Page;
