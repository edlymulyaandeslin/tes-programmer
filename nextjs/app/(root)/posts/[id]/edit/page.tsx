'use client';

import Loader from '@/components/Loader';
import { useAuth } from '@/context/auth';
import { api } from '@/lib/api';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Edit = () => {
  const { id } = useParams();
  const { isLoggedIn, token, user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState({
    title: null,
    content: null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoggedIn || !user) return router.push('/login');

    setLoading(true);

    const formData = {
      title,
      content,
    };

    const { success, message, data } = await api.posts.update(
      String(id),
      formData,
    );

    if (success) {
      alert(message);
      setLoading(false);
      router.push('/posts');
    } else {
      setLoading(false);
      setErrors(JSON.parse(data));
      alert(message);
    }
  };

  useEffect(() => {
    const loadPost = async () => {
      if (!isLoggedIn || !token) {
        return;
      }

      try {
        const { success, data } = await api.posts.getById(String(id));

        if (!success || !data) {
          alert('Post not found');
          router.push('/posts');
          return;
        }

        if (user?.id !== data.author_id) {
          alert('Unauthorized action');
          router.push('/posts');
          return;
        }

        setTitle(data.title);
        setContent(data.content);
      } catch (err) {
        console.error('Error loading post:', err);
      }
    };

    loadPost();
  }, [id, isLoggedIn, token, user]);

  return (
    <>
      <div className="space-y-4 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-10">Edit New Post</h1>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-3xl flex flex-col items-center justify-center space-y-1"
        >
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">Title</legend>
            <input
              type="text"
              className="input w-full"
              placeholder="Type here"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && <p className="text-red-500">{errors.title[0]}</p>}
          </fieldset>

          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">Description</legend>
            <textarea
              className="textarea h-24 w-full"
              placeholder="Description"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            {errors.content && (
              <p className="text-red-500">{errors.content[0]}</p>
            )}
          </fieldset>

          <div className="flex justify-end w-full mt-2 gap-2">
            <button className="btn btn-neutral">
              <Link href={'/posts'}>Kembali</Link>
            </button>
            <button className="btn btn-primary" type="submit">
              {loading ? <Loader /> : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Edit;
