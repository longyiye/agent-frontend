import axios from 'axios';
import { API_BASE_URL, TIMEOUT } from '../config/env.js';

const http = axios.create({
	baseURL: API_BASE_URL,
	timeout: TIMEOUT,
});

http.interceptors.request.use((config) => {
	return config;
});

http.interceptors.response.use(
	(resp) => resp,
	(error) => Promise.reject(error)
);

export default http;


