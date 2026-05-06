import { api } from '@/lib/api';
import { IPost } from '@/model/post.model';
import { dateForHuman } from '@/utils';
import Link from 'next/link';

interface RouteParams {
  params: Promise<Record<string, string>>;
}

const DetailPost = async ({ params }: RouteParams) => {
  const { id } = await params;

  const { success, data } = await api.posts.getById(id);

  if (!success || !data) return null;

  const post: IPost = data!;

  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-between gap-2 flex-wrap">
          <h1 className="text-3xl font-bold">{post.title}</h1>
          <p className="text-sm text-gray-400 italic font-semibold">
            Diperbarui {dateForHuman(post.updated_at)}
          </p>
        </div>

        <h1 className="text-lg font-semibold">Author - {post.author?.name}</h1>

        <p className="text-gray-600">{post.content}</p>

        <Link href="/posts" className="btn btn-primary hover:underline">
          Back to Posts
        </Link>
      </div>
    </>
  );
};

export default DetailPost;
