import { IPost } from '@/model/post.model';
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
    logout: (token: string) =>
      fetchHandler(`${API_BASE_URL}/logout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
  },
  posts: {
    getAll: () =>
      fetchHandler(`${API_BASE_URL}/posts`, {
        method: 'GET',
      }),
    getById: (id: string) =>
      fetchHandler(`${API_BASE_URL}/posts/${id}`, {
        method: 'GET',
      }),
    create: (data: Partial<IPost>) =>
      fetchHandler(`${API_BASE_URL}/posts`, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    update: (id: string, data: Partial<IPost>) =>
      fetchHandler(`${API_BASE_URL}/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    delete: (id: string) =>
      fetchHandler(`${API_BASE_URL}/posts/${id}`, {
        method: 'DELETE',
      }),
  },
};
