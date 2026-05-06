import { api } from '@/lib/api';
import { IPost } from '@/model/post.model';
import Link from 'next/link';

const Page = async () => {
  const { success, data } = await api.posts.getAll();

  if (!success || !data) return null;

  const posts = data.data!;

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
              <th>Title</th>
              <th>Author</th>
              <th>Content</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post: IPost, index: number) => (
              <tr key={post.id}>
                <th>{index + 1}</th>
                <td>{post.title}</td>
                <td>{post.author?.name}</td>
                <td className="line-clamp-2">{post.content}</td>
                <td>
                  <div className="flex gap-1 items-center justify-center">
                    <Link
                      href={`/posts/${post.id}`}
                      className="btn btn-dash btn-sm"
                    >
                      Detail
                    </Link>
                    <button className="btn btn-primary btn-sm">Edit</button>
                    <button className="btn btn-danger btn-sm ">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Page;
