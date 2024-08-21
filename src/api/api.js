// src/api/api.js
import axios from 'axios';

const backendAPI = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

const fastAPI = axios.create({
  baseURL: process.env.REACT_APP_FASTAPI_URL,
});

export { backendAPI, fastAPI };
