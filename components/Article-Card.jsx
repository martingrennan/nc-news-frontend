import { useNavigate } from "react-router";
import ArticleByID from "./ArticleByID";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";

const ArticleCard = ({ article }) => {
  const navigate = useNavigate();
  const [articleID, setArticleID] = useState(0)

  const submitArticleID = (e) => {
    e.preventDefault(); 
    setArticleID(article.article_id)
    navigate(`/article-by-id/${article.article_id}`); 
  };

  return (
    <div>
      <img
        onClick={submitArticleID}
        className="article-pic"
        src={article.article_img_url}
        alt="Article"
      />
      <p onClick={submitArticleID}>{article.title}</p>
      <p> posted by {article.author}</p>
      <p>{article.topic}</p>
      <p>{article.comment_count} comments</p>
    </div>
  );
};

export default ArticleCard;