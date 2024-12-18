import { getArticles } from "../src/api";
import ArticleCard from "./Article-Card";
import React from "react";
import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { topic } = useParams();

  useEffect(() => {
    getArticles(topic)
      .then((articles) => {
        setArticles(articles);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const handleSortChange = (e) => {
    const {name, value} = e.target;
    setSearchParams({[name]: value})   
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
        <option name="author" value="author">Author</option>
        <option name="title" value="title">Title</option>
        <option name="created_at" value="created_at">Creation date</option>
        <option name="votes" value="votes">Votes</option>
        <option name="comment_count" value="comment_count">Comment count</option>
      </select>
      {articles.map((article) => {
        return <ArticleCard key={article.article_id} article={article} />;
      })}
    </>
  );
};

export default Articles;

/*
sort Bys    
"author",
"title",
"article_id",
"topic",
"created_at",
"article_img_url",
"votes",
"comment_count",
*/
