import { Link } from "react-router";
import { useContext } from "react";
import { UserContext } from "./UserContext";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);

  const logOut = () => {
    setUser(null);
  };

  return (
    <>
      <Link to="">
        <button>Home</button>
      </Link>
      <Link to="/articles">
        <button>View all articles</button>
      </Link>
      {user === null ? (
        <Link to="/log-in">
          <button>Log in</button>
        </Link>
      ) : (
        <button onClick={logOut}>Log Out</button>
      )}
    </>
  );
};

export default Navbar;
