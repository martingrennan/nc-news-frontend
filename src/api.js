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

export const getArticleByID = (articleID) => {
  return api.get(`/articles/${articleID}`).then(({ data }) => {
    return data.articles;
  });
};

export const getComments = (articleID) => {
  return api.get(`/articles/${articleID}/comments`).then(({ data }) => {
    return data.comments;
  });
};

export const upvoteArticle = (articleID) => {
  return api.patch(`/articles/${articleID}`, { inc_votes: 1 })
};

export const downvoteArticle = (articleID) => {
  return api.patch(`/articles/${articleID}`, { inc_votes: -1 })
};

export const postComment = (articleID, commentBody) => {
  return api.post(`/articles/${articleID}/comments`, commentBody).then(() => {
    console.log('posted')
})
}

export const getUsers = () => {
  return api.get(`/users`).then(({ data }) => {
    return data.users;
  });
};