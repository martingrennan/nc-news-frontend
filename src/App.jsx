import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Articles from "./components/Articles";
import ArticleByID from "./components/ArticleByID";
import LogIn from "./components/LogIn";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router";

function App() {
  return (
    <>
      <div className="layout">
        <Header></Header>
        <Navbar></Navbar>
        <div className="content-wrapper">
          <Routes>
            <Route path="/articles" element={<Articles />}></Route>
            <Route path="/articles/:topic" element={<Articles />}></Route>
            <Route
              path="/article-by-id/:articleID"
              element={<ArticleByID />}
            ></Route>
            <Route path="log-in" element={<LogIn />}></Route>
          </Routes>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
}

export default App;
