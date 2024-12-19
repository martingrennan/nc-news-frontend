import {
  getArticleByID,
  getComments,
  postComment,
  deleteComment,
  upvoteArticle, 
  downvoteArticle
} from "../api";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import CommentCard from "./Comment-Card";
import { UserContext } from "./UserContext";
import { useContext } from "react";

const ArticleByID = () => {
  const [article, setArticle] = useState([]);
  const [comments, setComments] = useState([]);
  const [noInternet, setNoInternet] = useState(false);
  const [voteChange, setVoteChange] = useState(0);
  const [deletedCommentID, setDeletedCommentID] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const { user } = useContext(UserContext);
  const [commentBody, setCommentBody] = useState({});
  const [inputValue, setInputValue] = useState("");
  const { articleID } = useParams();

  //get article by ID
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

  //get comments for article
  useEffect(() => {
    setIsLoading(true);
    getComments(articleID)
      .then((commentsData) => {
        setIsLoading(false);
        setComments(commentsData);
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
    setInputValue(e.target.value);
    setCommentBody({
      body: e.target.value,
      author: user.username,
      //change this back to user.username
    });
  };

  const handleSubmitComment = (e) => {
    if (!commentBody.body.trim() || isPosting) return;

    setIsPosting(true);
    postComment(articleID, commentBody)
      .then((postedComment) => {
        setComments((prevComments) => [postedComment, ...prevComments]);
        setInputValue("");
        setIsPosting(false);
      })
      .catch((err) => {
        setIsPosting(false);
        console.log(err);
      });
  };

  const deleteOwnComment = (commentID) => {
    console.log(commentID);
    setDeletedCommentID(commentID);
    deleteComment(commentID)
      .then(() => {
        setComments((currComments) => {
          return currComments.filter(
            (comment) => comment.comment_id !== commentID
          );
        });
      })
      .catch((err) => {
        setDeletedCommentID(null);
        console.log(err);
      });
  };

  return (
    <>      <div className="content">
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
            <label htmlFor="message">
              Message: <br></br>
            </label>
            <br></br>
            <textarea
              id="message"
              name="message"
              rows="4"
              cols="50"
              value={inputValue}
              onChange={handleCommentTyping}
              placeholder="Write your comment here..."
              required
            ></textarea>
            <br></br>
            <button
              type="submit"
              onClick={handleSubmitComment}
              disabled={isPosting}
            >
              {isPosting === true ? "Posting..." : "Post Comment"}
            </button>
          </>
        )}
      </form>

      {comments.length === 0 ? (
        <p>No comments to display</p>
      ) : (
        <ul className="comments-list">
          {comments.map((comment) => (
            <CommentCard
              key={comment.comment_id}
              comment={comment}
              deleteOwnComment={deleteOwnComment}
            />
          ))}
        </ul>
      )}
      </div>
    </>
  );
};
export default ArticleByID;
