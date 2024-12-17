const CommentCard = ({ comment }) => {
  const date = new Date(comment.created_at)
  const formattedDate = date.toLocaleDateString('en-UK')
  const formattedTime = date.toLocaleTimeString('en-UK', { hour: '2-digit', minute: '2-digit'})

  return (
    <div>
      <p>{comment.author} said: {comment.body} | {formattedTime} | {formattedDate} </p>
      <p>{comment.votes} votes</p>
    </div>
  );
};

export default CommentCard;

/*
- change date format
*/
