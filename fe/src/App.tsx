import React from "react";
import { Routes, Route } from "react-router-dom";

import { PostsContextProvider } from "./stores/posts-store/post-store";
import { UserContextProvider } from "./stores/user-store/user-store";
import Posts from "./pages/posts";
import Post from "./pages/post";
import Login from "./pages/login";
import Register from "./pages/register";
import Nav from "./components/navigation";
import { HOME_PAGE } from "./constants";

const NoMatch = () => {
  return <div>no matching route found</div>;
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
      <UserContextProvider>
        <PostsContextProvider>
          <div className="container mx-auto">
            <Root>
              <Routes>
                <Route path="/signin" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Posts />} />
                <Route path="/posts/:id" element={<Post />} />

                <Route path="*" element={<NoMatch />} />
              </Routes>
            </Root>
          </div>
        </PostsContextProvider>
      </UserContextProvider>
    );
  }
}

export default App;
