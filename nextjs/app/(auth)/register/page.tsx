'use client';

import { api } from '@/lib/api';
import { useState } from 'react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({
    name: null,
    email: null,
    password: null,
    confirm_password: null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      name: name,
      email: email,
      password: password,
      confirm_password: confirmPassword,
    };

    const { success, message, data } = await api.auth.register(formData);

    if (success) {
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      alert('Registrasi berhasil! Silahkan login.');
      window.location.href = '/login';
    } else {
      setErrors(JSON.parse(data));
      alert(message);
    }
  };

  return (
    <div className="flex flex-col items-center mt-20 justify-center">
      <h1 className="text-3xl font-bold ">Register Page</h1>

      <form onSubmit={handleSubmit}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Register</legend>

          <label className="label">Name</label>
          <input
            type="text"
            className="input"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p className="text-red-500">{errors.name[0]}</p>}

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

          <label className="label">Confirm Password</label>
          <input
            type="password"
            className="input"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirm_password && (
            <p className="text-red-500">{errors.confirm_password[0]}</p>
          )}

          <button className="btn btn-neutral mt-4" type="submit">
            Register
          </button>
        </fieldset>
      </form>
      <p className="text-sm font-semibold">
        Sudah memiliki akun?{' '}
        <a href="/login" className="text-blue-500 hover:underline">
          Login di sini
        </a>
      </p>
    </div>
  );
};

export default Register;
