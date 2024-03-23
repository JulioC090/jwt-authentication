import axios from 'axios';
import Cookie from 'js-cookie';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export default function getAxiosHttpClient(router: AppRouterInstance) {
  const token = Cookie.get('auth_token');

  const axioshttpClient = axios.create({
    baseURL: 'http://localhost:5000',
    validateStatus: function (status) {
      return status < 500;
    },
  });

  axioshttpClient.interceptors.response.use((response) => {
    if (response.status === 401) {
      Cookie.remove('auth_token');
      router.push('/login');
    }

    return response;
  });

  if (token) {
    axioshttpClient.defaults.headers['Authorization'] = `Bearer ${token}`;
  }

  return axioshttpClient;
}
