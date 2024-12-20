import { useNavigate } from "react-router";

const ArticleCard = ({ article }) => {
  const navigate = useNavigate();

  const submitArticleID = (e) => {
    e.preventDefault();
    navigate(`/article-by-id/${article.article_id}`);
  };

  return (
    <>
      <div class="card" onClick={submitArticleID}>
        <div class="bg">
          <img
            onClick={submitArticleID}
            className="article-pic"
            src={article.article_img_url}
            alt="Article"
          />
          <h3 onClick={submitArticleID} className="article-links">
            {article.title}
          </h3>
          <p class> posted by {article.author}</p>
          <p>{article.votes} votes</p>
          <p>{article.topic}</p>
          <p>{article.comment_count} comments</p>
        </div>
        <div class="blob"></div>
      </div>
    </>
  );
};

export default ArticleCard;
