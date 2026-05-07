'use client';

import Loader from '@/components/Loader';
import Pagination from '@/components/Pagination';
import { useAuth } from '@/context/auth';
import { api } from '@/lib/api';
import { IPost } from '@/model/post.model';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const Page = () => {
  const { isLoggedIn, user } = useAuth();
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || '1';
  const [posts, setPosts] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  console.log(posts);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);

        const { success, data } = await api.posts.getAll(Number(page));

        if (!success || !data) return;

        setPosts(data);
      } catch (err) {
        setLoading(false);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, [page]);

  const handleDelete = async (id: number) => {
    const confim = confirm('Anda yakin ingin menghapus data ini?');

    if (!confim) return;

    const { success, message } = await api.posts.delete(String(id));

    if (success) {
      alert(message);
      window.location.reload();
    } else {
      alert(message);
      console.error(message);
    }
  };

  return (
    <>
      <div className="flex justify-between flex-wrap gap-2">
        <h1 className="text-3xl font-bold ">List Post</h1>

        <Link href="/posts/create" className="btn btn-primary btn-sm mt-2">
          Create Post
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>No</th>
              <th>Author</th>
              <th>Title</th>
              <th>Content</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {posts?.data?.map((post: IPost, index: number) => (
              <tr key={post.id}>
                <th>{posts?.from + index}</th>
                <td>{post.author?.name}</td>
                <td>{post.title}</td>
                <td className="line-clamp-2">{post.content}</td>
                <td>
                  <div className="flex gap-1 items-center justify-start">
                    <Link
                      href={`/posts/${post.id}`}
                      className="btn btn-dash btn-sm"
                    >
                      Detail
                    </Link>
                    {isLoggedIn && user?.id === post.author_id && (
                      <>
                        <Link
                          href={`/posts/${post.id}/edit`}
                          className="btn btn-dash btn-sm"
                        >
                          Edit
                        </Link>
                        <button
                          className="btn btn-error btn-sm"
                          onClick={() => handleDelete(post.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {loading && (
              <tr>
                <td colSpan={5}>
                  <Loader />
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {posts?.data && posts?.data?.length > 0 && (
          <Pagination
            prevLink={posts?.prev_page_url}
            nextLink={posts?.next_page_url}
            currentPage={posts?.current_page}
            from={posts?.from}
            to={posts?.to}
            total={posts?.total}
            lastPage={posts?.last_page}
          />
        )}
      </div>
    </>
  );
};

export default Page;
