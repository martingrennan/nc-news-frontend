import { getArticleByID, getComments } from "../src/api";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import CommentCard from "./Comment-Card";

const ArticleByID = () => {
  const [article, setArticle] = useState([]);
  const [comments, setComments] = useState("");
  const { articleID } = useParams();

  useEffect(() => {
    getArticleByID(articleID)
      .then((article) => {
        setArticle(article[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [articleID]);

  useEffect(() => {
    getComments(articleID)
      .then((comments) => {
        setComments(comments);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [articleID]);

  return (
    <>
      <img className="article-pic" src={article.article_img_url}></img>
      <h4>{article.title}</h4>
      <p> posted by {article.author}</p>
      <p>{article.topic}</p>
      <p>{article.comment_count} comments</p>
      {Array.isArray(comments) && comments.length > 0 ? (
        comments.map((comment) => {
          return <CommentCard key={comment.comment_id} comment={comment} />;
        })
      ) : (
        <p>No comments available</p>
      )}
    </>
  );
};
export default ArticleByID;
