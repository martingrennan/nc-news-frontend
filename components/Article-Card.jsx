const ArticleCard = ({article}) => {
    return (
        <div>
            <img className="article-pic" src={article.article_img_url}></img>
            <h4>{article.title}</h4>
            <p> posted by {article.author}</p>
            <p>{article.topic}</p>
            <p>{article.comment_count} comments</p>
        </div>
    );
  };
  
  export default ArticleCard;
  