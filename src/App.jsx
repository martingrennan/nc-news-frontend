import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Articles from "./components/Articles";
import ArticleByID from "./components/ArticleByID";
import LogIn from "./components/LogIn";
import Navbar from "./components/Navbar";
import ErrorPage from "./components/ErrorPage";
import Home from "./components/Home";
import { getTopics } from "./api";
import { Routes, Route } from "react-router";
import React, { useState, useEffect } from "react";

function App() {
  const [validTopics, setValidTopics] = useState([]);

  useEffect(() => {
    getTopics()
      .then((topics) => {
        const validTopics = topics.map((topic)=> {
          return topic.slug
        })
        return validTopics
      })
      .then((validTopics) => {
        setValidTopics(validTopics)
          })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Header></Header>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Articles validTopics={validTopics} />} ></Route>
        <Route path="/articles/:topic" element={<Articles validTopics={validTopics} />}></Route>
        <Route
          path="/article-by-id/:articleID"
          element={<ArticleByID />}
        ></Route>
        <Route path="log-in" element={<LogIn />}></Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;
