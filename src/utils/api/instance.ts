import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:31299/api'
});

export const weatherApi = axios.create({
  baseURL: 'http://api.weatherapi.com/v1',
  headers: {
    key: import.meta.env.VITE_WEATHER_TOKEN
  }
});
