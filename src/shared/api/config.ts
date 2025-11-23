import axios from 'axios';

export const API_BASE_URL = 'http://localhost:3001/api/v1';

export const http = axios.create({
  baseURL: API_BASE_URL
});
