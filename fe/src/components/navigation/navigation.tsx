import { Link } from "react-router-dom";

import { useUsersContext } from "../../stores/user-store/use-user-context-hook";

const Nav = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const userState = useUsersContext();

  return (
    <>
      <nav className="mx-4 my-4">
        <Link className="mx-2" to="posts">
          Home
        </Link>
        <Link className="mx-2" to="profile">
          Profile
        </Link>
        <Link className="mx-2" to="signin">
          Signin
        </Link>
        <Link className="mx-2" to="signup">
          Signup
        </Link>
      </nav>
    </>
  );
};

export default Nav;
