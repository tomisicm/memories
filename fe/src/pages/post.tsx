import PageLayout from "../components/layouts/post-page-layout";
import { PostContextProvider } from "../stores/post-store/post-store";

const Page = (): JSX.Element => {
  return (
    <PostContextProvider>
      <PageLayout />
    </PostContextProvider>
  );
};

export default Page;
