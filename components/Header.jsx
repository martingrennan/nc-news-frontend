import { UserContext } from "./UserContext";
import { useContext } from "react";

const Header = () => {
  const {user} = useContext(UserContext)

  return (
    <>
    {user !== null ? <p>Logged in as {user.username} <img src={user.avatar_url}  className="mini-avatar"/> </p> : null}
      <h1>Welcome to NC News</h1>
      
    </>
  );
};

export default Header;
