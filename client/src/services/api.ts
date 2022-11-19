import axios from 'axios';

const ApiClient = () => {

  const instance = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      headers: {
          accept: '*/*',
          'Content-Type': 'application/json',
      }
  })

  return instance;
};

export default ApiClient();