import axios from 'axios';

const API = axios.create({
  baseURL: 'https://mern-blog-oo44.onrender.com/',
});

export default API;
