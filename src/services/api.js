import axios from 'axios';

const api = axios.create({
  baseURL: 'https://17945223ce91.ngrok-free.app', // backend ngrok
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'ngrok-skip-browser-warning': 'true',
  },
});

// Interceptor para adicionar token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }

  console.log('📡 Axios request:', {
    url: config.url,
    method: config.method,
    headers: config.headers,
    token: token ? 'Token presente' : 'Token ausente',
  });

  return config;
});

// Interceptor de resposta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('❌ Erro na resposta da API:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
    });

    if (error.response?.status === 401) {
      console.warn('⚠️ Token inválido ou expirado');
      console.log('Token no localStorage:', localStorage.getItem('token'));
    }

    return Promise.reject(error);
  }
);

export default api;
