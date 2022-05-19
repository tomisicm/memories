import React from "react";
import { Routes, Route } from "react-router-dom";

import { PostsContextProvider } from "./stores/posts-store/posts-store";
import { UserContextProvider } from "./stores/user-store/user-store";
import Posts from "./pages/posts";
import Post from "./pages/post";
import Login from "./pages/signin";
import Register from "./pages/signup";
import Nav from "./components/navigation/navigation";
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
                <Route path="/">
                  <Route path="/posts" element={<Posts />} />
                  <Route path="/posts/:id" element={<Post />} />
                </Route>
                <Route path="/signin" element={<Login />} />
                <Route path="/signup" element={<Register />} />

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
