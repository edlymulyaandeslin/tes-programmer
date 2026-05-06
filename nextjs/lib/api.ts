import { IPost } from '@/model/post.model';
import { LoginPayload, RegisterPayload } from './payload';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'htpp://localhost:8000/api';

export const api = {
  auth: {
    register: (data: RegisterPayload) =>
      fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      }),
    login: (data: LoginPayload) =>
      fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      }),
    logout: () =>
      fetch(`${API_BASE_URL}/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }),
  },
  posts: {
    getAll: () => fetch(`${API_BASE_URL}/posts`),
    getById: (id: string) => fetch(`${API_BASE_URL}/posts/${id}`),
    create: (data: Partial<IPost>) =>
      fetch(`${API_BASE_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      }),
    update: (id: string, data: Partial<IPost>) =>
      fetch(`${API_BASE_URL}/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      }),
    delete: (id: string) =>
      fetch(`${API_BASE_URL}/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }),
  },
};
