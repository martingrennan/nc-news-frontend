import { Link } from "react-router";
import { useNavigate } from "react-router";
import { Routes, Route } from "react-router";
import { useState, useEffect } from "react";
import ArticleByID from "./ArticleByID";

const Navbar = () => {
  const navigate = useNavigate();
  
  const [articleID, setArticleID] = useState(1);

  const handleChange = (e) => {
    e.preventDefault();
    setArticleID(e.target.value)
  }

//   const submitArticleID = (e) => {
//     e.preventDefault();
//     navigate("/article-by-id");
//   };

  return (
    <>
      <Link to="/">
        <button>Home</button>
      </Link>
      {/* <form action="submit.html" method="GET">
        <label htmlFor="article_id">Find an Article ID: </label>
        <input onChange={handleChange} type="number" id="article_id" name="article_id" required></input>
        <button type="submit" onClick={submitArticleID}>
          Go
        </button>
      </form> */}
      {/* <Routes>
        <Route path="/article-by-id" element={<ArticleByID articleID={articleID}/>}></Route>
      </Routes> */}
    </>
  );
};

export default Navbar;
