'use client';

import Loader from '@/components/Loader';
import { useAuth } from '@/context/auth';
import { api } from '@/lib/api';
import { IPost } from '@/model/post.model';
import { dateForHuman } from '@/utils';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const DetailPost = () => {
  const { id } = useParams();
  const router = useRouter();
  const { isLoggedIn, token } = useAuth();
  const [post, setPost] = useState<IPost | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      if (!isLoggedIn || !token) {
        console.log('You need logged in');
        return;
      }

      try {
        setLoading(true);

        const { success, data } = await api.posts.getById(String(id));

        if (!success || !data) {
          alert('Post not found');
          router.push('/posts');
          return;
        }

        setPost(data);
      } catch (err) {
        console.error('Error loading post:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id, isLoggedIn, token]);

  if (loading) {
    return <Loader />;
  }

  if (!post) return null;

  return (
    post && (
      <>
        <div className="space-y-4">
          <div className="flex justify-between gap-2 flex-wrap">
            <h1 className="text-3xl font-bold">{post.title}</h1>
            <p className="text-sm text-gray-400 italic font-semibold">
              Diperbarui {dateForHuman(post.created_at)}
            </p>
          </div>

          <h1 className="text-lg font-semibold">
            Author - {post?.author?.name}
          </h1>

          <p className="text-gray-600">{post?.content}</p>

          <Link href="/posts" className="btn btn-primary hover:underline">
            Back to Posts
          </Link>
        </div>
      </>
    )
  );
};

export default DetailPost;
