import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import Posts from "./pages/posts";
import Post from "./pages/post";
import { PostsContextProvider } from "./stores/posts-store/post-store";
import { HOME_PAGE } from "./constants";

// https://github.com/reach/router/issues/141
// TODO: not found page

const Nav = () => {
  return (
    <>
      <nav className="mx-4 my-4">
        <Link to="/">Home</Link> <Link to="profile">Profile</Link>{" "}
      </nav>
    </>
  );
};

const Root = ({ children }: any) => (
  <div>
    <Nav />
    <h1 className="text-3xl font-bold underline">{HOME_PAGE.WELCOME}</h1>
    {children}
  </div>
);

class App extends React.Component {
  render() {
    return (
      <PostsContextProvider>
        <div className="container mx-auto">
          <Root>
            <Routes>
              <Route path="/" element={<Posts />} />
              <Route path="/posts/:id" element={<Post />} />
            </Routes>
          </Root>
        </div>
      </PostsContextProvider>
    );
  }
}

export default App;
