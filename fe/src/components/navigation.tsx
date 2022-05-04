import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <nav className="mx-4 my-4">
        <Link to="/home">Home</Link>
        <Link to="profile">Profile</Link>
        <Link to="signin">Signin</Link>
      </nav>
    </>
  );
};

export default Nav;
