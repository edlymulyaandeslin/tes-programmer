'use client';

import { useAuth } from '@/context/auth';
import { api } from '@/lib/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();
  const { isLoggedIn, token, user } = useAuth();

  const handleLogout = async () => {
    const { success } = await api.auth.logout(token);
    if (success) {
      cookieStore.delete('token');
      cookieStore.delete('user');
      router.push('/login');
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link href={'/'} className="btn btn-ghost text-xl">
          BlogPost
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {isLoggedIn ? (
            <>
              <li>
                <Link href={'/posts'}>Post</Link>
              </li>
              <li>
                <details>
                  <summary className="capitalize">{user.name}</summary>
                  <ul className="bg-base-100 rounded-t-none p-2">
                    <li>
                      <button onClick={handleLogout}>Logout</button>
                    </li>
                  </ul>
                </details>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link className="btn btn-primary" href={'/login'}>
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
