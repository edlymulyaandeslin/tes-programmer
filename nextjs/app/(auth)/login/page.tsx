'use client';

import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      email: email,
      password: password,
    };

    const { success, message, data } = await api.auth.login(formData);

    if (success) {
      setEmail('');
      setPassword('');
      alert('Login berhasil!');

      cookieStore.set('token', data.token);
      cookieStore.set('user', JSON.stringify(data.user));
      router.push('/');
    } else {
      const isString = data === 'Invalid email or password';
      alert(isString ? data : message);
      setErrors(isString ? data : JSON.parse(data));
    }
  };

  return (
    <div className="flex flex-col items-center mt-20 justify-center">
      <h1 className="text-3xl font-bold ">Login Page</h1>

      <form onSubmit={handleSubmit}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Login</legend>

          <label className="label">Email</label>
          <input
            type="email"
            className="input"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="text-red-500">{errors.email[0]}</p>}

          <label className="label">Password</label>
          <input
            type="password"
            className="input"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password[0]}</p>
          )}

          <button className="btn btn-neutral mt-4" type="submit">
            Login
          </button>
        </fieldset>
      </form>
      <p className="text-sm font-semibold">
        Belum memiliki akun?{' '}
        <a href="/register" className="text-blue-500 hover:underline">
          Daftar di sini
        </a>
      </p>
    </div>
  );
};

export default Login;
