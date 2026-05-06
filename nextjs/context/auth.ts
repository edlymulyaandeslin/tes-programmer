'use client';

import { useEffect, useState } from 'react';

export const useAuth = () => {
  const [auth, setAuth] = useState({
    isLoggedIn: false,
    token: null,
    user: null,
  });

  useEffect(() => {
    const loadAuth = async () => {
      const token = await cookieStore.get('token');
      const user = await cookieStore.get('user');

      if (token?.value && user?.value) {
        setAuth({
          isLoggedIn: true,
          token: token.value,
          user: JSON.parse(user.value),
        });
      }
    };

    loadAuth();
  }, []);

  return auth;
};
