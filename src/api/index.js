import axios from "axios";

const request = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

request.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZmEwNWE3ZWZiYThiODc0ZjNkNmU3MzA0NjgxOTM5NCIsIm5iZiI6MTczNDU4MjM1NS4zNTM5OTk5LCJzdWIiOiI2NzYzYTA1M2EwY2MzZGU2NDcwMDBlYTciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.R8SJBdXk5zh-DVE1oLpaQiAd5P5EEx8eE69Nu8VvnFM`;
  return config;
});

export { request };
