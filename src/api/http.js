import axios from 'axios';

const http = axios.create({
	baseURL: 'http://localhost:8123/api',
	timeout: 30000,
});

http.interceptors.request.use((config) => {
	return config;
});

http.interceptors.response.use(
	(resp) => resp,
	(error) => Promise.reject(error)
);

export default http;


