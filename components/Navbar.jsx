import { Link } from "react-router";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import { useState, useEffect } from "react";
import { getTopics } from "../src/api";
import { useNavigate } from "react-router";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);

  const handleTopicChange = (e) => {
    const selectedTopic = e.target.value;
    navigate(`articles/${selectedTopic}`);
  };

  useEffect(() => {
    getTopics()
      .then((topics) => {
        setTopics(topics);
      })
      .catch((err) => {
        console.log(err);
      });
  });

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
      <label htmlFor="topic-dropdown">Search by topics </label>
      <select
        id="topic-dropdown"
        name="topic-dropdown"
        onChange={handleTopicChange}
      >
        <option value="">Topics:</option>
        {topics.map((topic, index) => {
          return (
            <>
              <option key={index} value={`${topic.slug}`}>{topic.slug}</option>
            </>
          );
        })}
      </select>
      {user === null ? (
        <Link to="/log-in">
          <button>Log in</button>
        </Link>
      ) : (
        <button onClick={logOut}>Log Out</button>
      )}
      <br></br>
    </>
  );
};

export default Navbar;
