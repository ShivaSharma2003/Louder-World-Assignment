import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://louder-world-assignment-1.onrender.com/v1/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;