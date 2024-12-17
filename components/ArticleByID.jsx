import { getArticleByID, getComments, postComment } from "../src/api";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { upvoteArticle, downvoteArticle } from "../src/api";
import CommentCard from "./Comment-Card";
import { UserContext } from "./UserContext";
import { useContext } from "react";

const ArticleByID = () => {
  const [article, setArticle] = useState([]);
  const [comments, setComments] = useState("");
  const [noInternet, setNoInternet] = useState(false);
  const [voteChange, setVoteChange] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserContext);
  const [commentBody, setCommentBody] = useState({});
  const { articleID } = useParams();
  const currentTime = new Date();

  useEffect(() => {
    setIsLoading(true);
    getArticleByID(articleID)
      .then((article) => {
        setIsLoading(false);
        setArticle(article[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [articleID]);

  useEffect(() => {
    setIsLoading(true);
    getComments(articleID)
      .then((comments) => {
        setIsLoading(false);
        setComments(comments);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [articleID]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  function handleDownvoteArticle() {
    downvoteArticle(article.article_id).catch(() => {
      setVoteChange((currVotes) => {
        setNoInternet(true);
        return currVotes + 1;
      });
    });
    setVoteChange((voteChange) => {
      setNoInternet(false);
      return voteChange - 1;
    });
  }

  function handleUpvoteArticle() {
    upvoteArticle(article.article_id).catch(() => {
      setVoteChange((currVotes) => {
        setNoInternet(true);
        return currVotes - 1;
      });
    });
    setVoteChange((currVotes) => {
      setNoInternet(false);
      return currVotes + 1;
    });
  }

  const handleCommentTyping = (e) => {
    setCommentBody({
      body: e.target.value,
      author: user.username
    });
  };
  console.log(commentBody)
  const handleSubmitComment = (e) => {
    e.preventDefault();
    postComment(articleID, commentBody)
  };


  return (
    <>
      <img className="article-pic" src={article.article_img_url}></img>
      <h4>{article.title}</h4>
      <p> posted by {article.author}</p>

      <p>{article.votes + voteChange} votes</p>
      <button onClick={handleDownvoteArticle}>➖</button>
      <button onClick={handleUpvoteArticle}>➕</button>
      {noInternet === true ? <p>No internet connection!</p> : null}
      <p>{article.topic}</p>
      <h4>{article.comment_count} comments</h4>
      <form>
        {user === null ? (
          <h4>Please log in to add a comment</h4>
        ) : (
          <>
            <h4>Add a new comment</h4>
            <label htmlFor="message">Message: <br></br></label>
            <br></br>
            <textarea id="message" name="message" rows="4" cols="50" onChange={handleCommentTyping} required></textarea>
            <button type="submit" onClick={handleSubmitComment}>
          Post Comment
        </button>
          </>
        )}
      </form>
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

