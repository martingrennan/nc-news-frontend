import axios from "axios";

const api = axios.create({
  baseURL: "https://nc-news-b3v0.onrender.com/api/",
});

export const getArticles = (categoryName) => {
    return api
      .get("/articles", { params: { category_name: categoryName } })
      .then(({ data }) => {
        return data.articles;
      });
  };