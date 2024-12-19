import { UserContext } from "./UserContext";
import { useContext } from "react";

const Header = () => {
  const {user} = useContext(UserContext)

  return (
    <>
    <div className="header">
    {user !== null ? <p>Logged in as {user.username} <img src={user.avatar_url}  className="mini-avatar"/> </p> : null}
      <h1>Welcome to NC News <img height="auto" width="50px" src="https://scontent.fman4-1.fna.fbcdn.net/v/t39.30808-6/310644391_519549663509290_8593585777861405569_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=8MZe8K_ZND8Q7kNvgGE_9oH&_nc_zt=23&_nc_ht=scontent.fman4-1.fna&_nc_gid=Aee_1UmoCyzcqOBiKI-waT-&oh=00_AYCaVo4tmkpdltexG3nGR3JL6_XIaoYO0RjcwKO2LmcYAw&oe=6769F718"/></h1>
    </div>
    </>
  );
};

export default Header;
