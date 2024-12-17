import { useState } from "react";
import "./App.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Articles from "../components/Articles";
import Navbar from "../components/Navbar";
import { Routes, Route } from "react-router";
import ArticleByID from "../components/ArticleByID";

function App() {
  return (
    <>
      <Header></Header>
      <Navbar></Navbar>
      <Routes>
        <Route path="/articles" element={<Articles/>}></Route>
        <Route path="/article-by-id/:articleID" element={<ArticleByID />}></Route>
      </Routes>
      {/* <Articles></Articles> */}
      <Footer></Footer>
    </>
  );
}

export default App;
