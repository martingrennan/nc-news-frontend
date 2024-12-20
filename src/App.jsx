import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Articles from "./components/Articles";
import ArticleByID from "./components/ArticleByID";
import LogIn from "./components/LogIn";
import Navbar from "./components/Navbar";
import ErrorPage from "./components/ErrorPage";
import Home from "./components/Home";

import { Routes, Route } from "react-router";


function App() {

  return (
    <>
      <Header></Header>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Articles />} ></Route>
        <Route path="/articles/:topic" element={<Articles />}></Route>
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
