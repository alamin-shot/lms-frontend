import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiClient = axios.create({
	baseURL: API_URL,
	timeout: 30000,
	headers: {
		'Content-Type': 'application/json',
	},
});

// Request interceptor - add token
apiClient.interceptors.request.use(
	(config) => {
		const skipAuthPaths = ['/api/auth/local', '/api/registration/register'];
		const shouldSkip = skipAuthPaths.some((path) => config.url?.includes(path));

		if (!shouldSkip) {
			const token = localStorage.getItem('jwt');
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
		}
		return config;
	},
	(error) => Promise.reject(error),
);

// Response interceptor - handle errors
apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			localStorage.removeItem('jwt');
			if (typeof window !== 'undefined') {
				window.location.href = '/login';
			}
		}
		return Promise.reject(error);
	},
);
