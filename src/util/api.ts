import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: process.env.REACT_APP_MOVIEDB_API_KEY,
  },
});

export const discover = async (params: any = {}) =>
  axiosInstance.get('/discover/movie', { params });

export const search = async (params: any = {}) =>
  axiosInstance.get('/search/movie', { params });
