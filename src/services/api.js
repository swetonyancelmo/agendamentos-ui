import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api', 
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  
  // 🚀 SÓ ADICIONA O TOKEN SE:
  // 1. O token existir
  // 2. A rota NÃO for de agendamentos (para evitar o 401 no formulário público)
  if (token && !config.url.includes('/appointments')) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    // Se for agendamento, garantimos que o cabeçalho vá limpo
    delete config.headers.Authorization;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;