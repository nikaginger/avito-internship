import axios from 'axios';

export const API_BASE_URL = '/api/v1';

export const http = axios.create({
  baseURL: API_BASE_URL
});
