import { getArticles } from "../api";
import ArticleCard from "./Article-Card";
import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, Navigate } from "react-router";

const Articles = ({validTopics}) => {
  const [articles, setArticles] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("");
  const [p, setP] = useState(0);
  const itemsPerPage = 10;
  const { topic } = useParams();

  useEffect(() => {
    getArticles(topic, sortBy, order, p)
      .then((articles) => {
        setArticles(articles);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [topic, sortBy, order, p]);

  validTopics.push(undefined)

  if (!validTopics.includes(topic)) {
    console.log('error')
    return <Navigate to="/error"/>
  }

  const handleSortChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({
      ...Object.fromEntries(searchParams),
      // ...searchParams,
      [name]: value,
    });
    setSortBy(value);
    setP(0);
  };

  const handleOrderChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({
      ...Object.fromEntries(searchParams),
      // ...searchParams,
      [name]: value,
    });
    setOrder(value);
    setP(0);
  };

  const pageUp = () => {
    setP((prevP) => prevP + 10);
  };

  const pageDown = () => {
    setP((prevP) => prevP - 10);
  };

  return (
    <>
      <br />
      <div className="content">
      <label htmlFor="sort-dropdown">Sort articles</label>
      <select id="sort-dropdown" name="sort_by" onChange={handleSortChange}>
        <option value="">Sort by:</option>
        <option name="created_at" value="created_at">
          Creation date
        </option>
        <option name="votes" value="votes">
          Votes
        </option>
        <option name="comment_count" value="comment_count">
          Comment count
        </option>
      </select>
      <br />
      <br />
      <label htmlFor="order-dropdown">Order articles</label>
      <select id="order-dropdown" name="order" onChange={handleOrderChange}>
        <option value="">Order by:</option>
        <option name="DESC" value="DESC">
          Highest
        </option>
        <option name="ASC" value="ASC">
          Lowest
        </option>
      </select>
      <div>
        {articles.map((article) => {
          return <ArticleCard key={article.article_id} article={article} />;
        })}
      </div>
      <div>
        {p === 0 ? (
          <button onClick={pageUp}>Next page</button>
        ) : (
          <>
            <button onClick={pageDown}>Previous page</button>
            {articles.length === itemsPerPage && <button onClick={pageUp}>Next page</button>}
          </>
        )}
      </div>
      </div>
    </>
  );
};

export default Articles;