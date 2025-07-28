import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

const getNewAccessToken = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/token/refresh-token`, {
      withCredentials: true,
    });

    const { accessToken } = response.data;
    localStorage.setItem('accessToken', accessToken);
    return accessToken;
  } catch (error) {
    console.error(' Refresh token failed:', error);
    throw error;
  }
};

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    const authEndpoints = ['/user/login', '/user/signup', '/admin/login', '/token/refresh-token'];
    const isAuthEndpoint = authEndpoints.some(endpoint => 
      originalRequest.url?.includes(endpoint)
    );

    if (err.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await getNewAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest); 
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }


    return Promise.reject(err);
  }
);

export default api;