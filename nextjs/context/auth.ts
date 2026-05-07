'use client';

import { useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  // tambahkan field lain sesuai model User Laravel
}

export const useAuth = () => {
  const [auth, setAuth] = useState<{
    isLoggedIn: boolean;
    token: string;
    user: User | null;
  }>({
    isLoggedIn: false,
    token: '',
    user: null,
  });

  useEffect(() => {
    const loadAuth = async () => {
      try {
        const tokenCookie = await cookieStore.get('token');
        const userCookie = await cookieStore.get('user');

        if (tokenCookie?.value && userCookie?.value) {
          setAuth({
            isLoggedIn: true,
            token: tokenCookie.value,
            user: JSON.parse(userCookie.value),
          });
        }
      } catch (error) {
        console.error('Error loading auth:', error);
      }
    };

    loadAuth();
  }, []);

  return auth;
};
