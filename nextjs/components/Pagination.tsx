import Link from 'next/link';

interface Props {
  from: number;
  to: number;
  total: number;
  lastPage: number;
  currentPage: number;
  prevLink: string | null;
  nextLink: string | null;
}

const Pagination = ({
  from,
  to,
  total,
  lastPage,
  prevLink,
  nextLink,
  currentPage,
}: Props) => {
  return (
    <div className="flex justify-between items-center mt-4 mx-8">
      <p>
        Showing {from} to {to} of {total} entries{' '}
      </p>

      <div className="join">
        <Link
          href={prevLink ? `posts?page=${currentPage - 1}` : '#'}
          className={`join-item btn ${!prevLink ? 'btn-disabled' : ''}`}
        >
          «
        </Link>
        <button className="join-item btn">
          Page {currentPage}/{lastPage}
        </button>
        <Link
          href={nextLink ? `posts?page=${currentPage + 1}` : '#'}
          className={`join-item btn ${!nextLink ? 'btn-disabled' : ''}`}
        >
          »
        </Link>
      </div>
    </div>
  );
};

export default Pagination;
