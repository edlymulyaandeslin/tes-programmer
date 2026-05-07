import { IPost } from '@/model/post.model';
import { getTokenFromCookie } from '@/utils';
import { fetchHandler } from './handler/fetch';
import { LoginPayload, RegisterPayload } from './payload';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

export const api = {
  auth: {
    register: (data: RegisterPayload) =>
      fetchHandler(`${API_BASE_URL}/register`, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    login: (data: LoginPayload) =>
      fetchHandler(`${API_BASE_URL}/login`, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    logout: async () => {
      const token = await getTokenFromCookie();

      return fetchHandler(`${API_BASE_URL}/logout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
  },
  posts: {
    getAll: async (page: number = 1) => {
      const token = await getTokenFromCookie();
      return fetchHandler(`${API_BASE_URL}/posts?page=${page}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    getById: async (id: string) => {
      const token = await getTokenFromCookie();

      return fetchHandler(`${API_BASE_URL}/posts/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    create: async (data: Partial<IPost>) => {
      const token = await getTokenFromCookie();

      return fetchHandler(`${API_BASE_URL}/posts`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    update: async (id: string, data: Partial<IPost>) => {
      const token = await getTokenFromCookie();

      return fetchHandler(`${API_BASE_URL}/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    delete: async (id: string) => {
      const token = await getTokenFromCookie();

      return fetchHandler(`${API_BASE_URL}/posts/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
  },
};
