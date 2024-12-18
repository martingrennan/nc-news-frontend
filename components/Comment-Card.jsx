import { UserContext } from "./UserContext";
import { useContext, useState } from "react";

const CommentCard = ({ comment, deleteOwnComment }) => {
  const date = new Date(comment.created_at);
  const formattedDate = date.toLocaleDateString("en-UK");
  const formattedTime = date.toLocaleTimeString("en-UK", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const { user } = useContext(UserContext);

  const handleDeleteComment = () => {
      deleteOwnComment(comment.comment_id)
  };

  return (
    <div>
      {user && user.username === comment.author ? (
        <>
          <p>
            {comment.author} said: {comment.body} | {formattedTime} |{" "}
            {formattedDate}
          </p>
          <p>{comment.votes} votes</p>
          <button type="submit" onClick={handleDeleteComment}>
            Delete comment ❌
          </button>
          <p>---------------------------------------------</p>
        </>
      ) : (
        <>
          <p>
            {comment.author} said: {comment.body} | {formattedTime} |{" "}
            {formattedDate}
          </p>
          <p>{comment.votes} votes</p>
          <p>---------------------------------------------</p>
        </>
      )}
    </div>
  );
};

export default CommentCard;

/*
- change date format
*/
