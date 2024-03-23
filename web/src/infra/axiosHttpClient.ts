import axios from 'axios';
import Cookie from 'js-cookie';

export default function getAxiosHttpClient() {
  const token = Cookie.get('auth_token');

  const axioshttpClient = axios.create({ baseURL: 'http://localhost:5000' });

  if (token) {
    axioshttpClient.defaults.headers['Authorization'] = `Bearer ${token}`;
  }

  return axioshttpClient;
}
