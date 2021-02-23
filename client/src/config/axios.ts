import axios from 'axios';

/**
 * Backend Connection configuration
 * Replace the below baseUrl with your local IP to connect to local backend server
 **/
const api = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 10000
});

// Set JSON Web Token in Client to be included in all calls
export const setClientToken = (token: string) => {
    api.interceptors.request.use(function (config: any) {
        config.headers.Authorization = token;
        return config;
    });
};

export default api;
