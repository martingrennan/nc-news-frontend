const CommentCard = ({ comment }) => {

  return (
    <div>
      <p>{comment.author}:</p>
      <p>{comment.body}</p>
      <p>{comment.created_at}</p>
      <p>{comment.votes} votes</p>
    </div>
  );
};

export default CommentCard;

//comment_id, article_id, author, body, created_at, votes