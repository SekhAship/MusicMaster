import axios from 'axios';

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`, // Match this with render backend url
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;


