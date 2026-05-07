'use client';

import { useAuth } from '@/context/auth';
import Link from 'next/link';

export default function Home() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="hero mt-22">
      <div className="hero-content text-center">
        <div className="max-w-4xl">
          <h1 className="text-5xl font-bold">Selamat Datang di BlogPost</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          {isLoggedIn ? (
            <Link href={'/posts'} className="btn btn-primary">
              Lihat Semua Posts
            </Link>
          ) : (
            <Link href={'/login'} className="btn btn-primary">
              Get Started
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
