import axios from 'axios';

const instance = axios.create({
  baseURL: '/api',
});

instance.interceptors.response.use((res) => {
  return res.data.info;
});

export default instance;
