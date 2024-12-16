import { getArticles } from "../src/api";
import ArticleCard from "./Article-Card";
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";

const Articles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles()
      .then((articles) => {
        setArticles(articles);
      })
      .catch((err) => {
        console.log(err);
      });
  } );

  return (
    <>
      {articles.map((article) => {
        return (
          <ArticleCard key={article.article_id} article={article} />
        );
      })}
    </>
  );
};



export default Articles;
