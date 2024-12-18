import { getArticles } from "../src/api";
import ArticleCard from "./Article-Card";
import React from "react";
import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState('')
  const [order, setOrder] = useState('')
  const { topic } = useParams();
  // console.log(searchParams)

  useEffect(() => {
    getArticles(topic, sortBy, order)
      .then((articles) => {
        setArticles(articles);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const handleSortChange = (e) => {
    const {name, value} = e.target;
    setSearchParams({
      ...Object.fromEntries(searchParams),
      [name]: value,
      order: order,
    }); 
    setSortBy(value)
  };

  const handleOrderChange = (e) => {
    const {name, value} = e.target;
    setSearchParams({
      ...Object.fromEntries(searchParams),
      [name]: value,
      sort: sortBy,
    });  
    setOrder(value)
  };


  return (
    <>
      <br></br>
      <label htmlFor="sort-dropdown">Sort articles </label>
      <select
        id="sort-dropdown"
        name="sort_by"
        onChange={handleSortChange}
      >
        <option value="">Sort by:</option>
        {/* <option name="author" value="author">Author</option>
        <option name="title" value="title">Title</option> */}
        <option name="created_at" value="created_at">Creation date</option>
        <option name="votes" value="votes">Votes</option>
        <option name="comment_count" value="comment_count">Comment count</option>
      </select>
      <br></br>
      <br></br>
      <label htmlFor="order-dropdown">Order articles </label>
      <select
        id="order-dropdown"
        name="order"
        onChange={handleOrderChange}
      >
        <option value="">    Order by:</option>
        <option name="DESC" value="DESC">Highest</option>
        <option name="ASC" value="ASC">Lowest</option>
      </select>
      {articles.map((article) => {
        return <ArticleCard key={article.article_id} article={article} />;
      })}
    </>
  );
};

export default Articles;
