import { getUsers } from "../src/api";
import React from "react";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "./UserContext";

const LogIn = () => {
  const [users, setUsers] = useState([]);
  const [input, setInput] = useState("");
  const [loggedInUser, setLoggedInUser] = useState("");
  const [userExists, setUserExists] = useState(false);

  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    getUsers()
      .then((users) => {
        setUsers(users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [users]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let userFound = false;
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === input) {
        setUserExists(true);
        setLoggedInUser(users[i]);
        setUser(users[i]);
        userFound = true;
        break;
      }
    }
    if (!userFound) {
      setUserExists(false);
      setUser(null);
    }
  };

  return (
    <>
      <form>
        <br></br>
        <label htmlFor="username">Enter your username to log in: </label>
        <input
          onChange={handleChange}
          type="text"
          id="username"
          name="username"
        ></input>
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
        {userExists === false ? <p>Please enter a valid username</p> : null}
        {user === null ? null : (
          <>
            <p>Success! Welcome {loggedInUser.username}</p>
            <img src={loggedInUser.avatar_url}></img>
          </>
        )}
      </form>
    </>
  );
};

export default LogIn;
