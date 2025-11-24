import axios, { type AxiosError } from 'axios';

export const API_BASE_URL = '/api/v1';

export const http = axios.create({
  baseURL: API_BASE_URL
});

http.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      const status = error.response.status;
      const message = error.message;

      switch (status) {
        case 400:
          console.error('Ошибка валидации:', message);
          break;
        case 404:
          console.error('Ресурс не найден:', message);
          break;
        case 500:
          console.error('Ошибка сервера:', message);
          break;
        default:
          console.error('Ошибка запроса:', message);
      }
    } else if (error.request) {
      console.error('Сервер не отвечает. Проверьте подключение.');
    } else {
      console.error('Ошибка при отправке запроса:', error.message);
    }

    return Promise.reject(error);
  }
);
