import axios from "axios";

const api = axios.create({
  baseURL: "https://nc-news-b3v0.onrender.com/api/",
});

export const getArticles = (topic, sort_by, order) => {
  return api
    .get("/articles", { params: { topic, sort_by, order } })
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
  return api.patch(`/articles/${articleID}`, { inc_votes: 1 });
};

export const downvoteArticle = (articleID) => {
  return api.patch(`/articles/${articleID}`, { inc_votes: -1 });
};

export const postComment = (articleID, commentBody) => {
  return api
    .post(`/articles/${articleID}/comments`, commentBody)
    .then(({ data }) => {
      return data.comment;
    });
};

export const getUsers = () => {
  return api.get(`/users`).then(({ data }) => {
    return data.users;
  });
};

export const getTopics = () => {
  return api.get("/topics").then(({ data }) => {
    return data.topics;
  });
};

export const deleteComment = (commentID) => {
  return api.delete(`/comments/${commentID}`).then(() => {
    console.log("deleted");
  });
};

/*
QUESTIONS:

- infinite loop of console.logs
- change order to Newest/Oldest when sort is date
- get user to stay logged in after post


*/