import axios from 'axios';

const url = 'http://localhost:5000';

const api = axios.create({baseURL : url});

api.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });

export const getParties = () => api.get('/party');

export const createParty = (newParty) =>  api.post('/party', newParty);

export const deleteParty = (id) => api.delete(`/party/${id}`);

export const joinParty = (id) => api.patch(`/party/join/${id}`);

export const login = (userData) => api.post('/user/login', userData);

export const signup = (userData) => api.post('/user/register', userData);