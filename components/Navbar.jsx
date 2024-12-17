import { Link } from "react-router";

const Navbar = () => {
  return (
    <>
      <Link to="">
        <button>Home</button>
      </Link>
      <Link to="/articles">
        <button>View all articles</button>
      </Link>
    </>
  );
};

export default Navbar;
