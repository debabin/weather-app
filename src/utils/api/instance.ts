import axios from 'axios';
import { LOCAL_STORAGE_KEYS } from '../constants';

export const api = axios.create({
  baseURL: 'http://localhost:31299/api'
});
api.interceptors.request.use(function (config) {
  const token = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);
  config.headers.token = token;
  return config;
});

export const weatherApi = axios.create({
  baseURL: 'http://api.weatherapi.com/v1',
  headers: {
    key: import.meta.env.VITE_WEATHER_TOKEN
  }
});
