import axios from 'axios';

const ApiClient = () => {

  const accessToken = localStorage.getItem('access_token');

  const instance = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      withCredentials:true,
      headers: {
          accept: '*/*',
          'Content-Type': 'application/json',
      },
    
      
  })

  return instance;
};

export default ApiClient();