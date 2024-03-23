import axios from 'axios';
import { parseCookies } from 'nookies';

export default function getAxiosHttpClient() {
  const { 'nextauth.token': token } = parseCookies();

  const axioshttpClient = axios.create({ baseURL: 'http://localhost:5000' });

  if (token) {
    axioshttpClient.defaults.headers['Authorization'] = `Bearer ${token}`;
  }

  return axioshttpClient;
}
