import { useNavigate } from "react-router";

const ArticleCard = ({ article }) => {
  const navigate = useNavigate();

  const submitArticleID = (e) => {
    e.preventDefault();
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
      <p>{article.votes} votes</p>
      <p>{article.topic}</p>
      <p>{article.comment_count} comments</p>
    </div>
  );
};

export default ArticleCard;
