import { getArticleByID, getComments } from "../src/api";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { upvoteArticle, downvoteArticle } from "../src/api";
import CommentCard from "./Comment-Card";

const ArticleByID = () => {
  const [article, setArticle] = useState([]);
  const [comments, setComments] = useState("");
  const [noInternet, setNoInternet] = useState(false);
  const [voteChange, setVoteChange] = useState(0);
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

  function handleDownvoteArticle() {
    downvoteArticle(article.article_id).catch(() => {
      setVoteChange((currVotes) => {
        setNoInternet(true)
        return currVotes + 1;
      });
    });
    setVoteChange((voteChange) => {
      setNoInternet(false)
      return voteChange - 1;
    });
  }

  function handleUpvoteArticle() {
    upvoteArticle(article.article_id).catch(() => {
      setVoteChange((currVotes) => {
        setNoInternet(true)
        return currVotes - 1;
      });
    });
    setVoteChange((currVotes) => {
      setNoInternet(false)
      return currVotes + 1;
    });
  }

  return (
    <>
      <img className="article-pic" src={article.article_img_url}></img>
      <h4>{article.title}</h4>
      <p> posted by {article.author}</p>

      <p>{article.votes + voteChange} votes</p>
      <button onClick={handleDownvoteArticle}>-</button>
      <button onClick={handleUpvoteArticle}>+</button>
      {noInternet === true ? <p>No internet connection!</p> : null}
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

//      {!rating ? null : <p id="show-card-text"> Rating: {rating} </p>}