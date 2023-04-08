import Link from 'next/link';

// pages：ページ番号の入った配列
const Pagination = ({ pages, current_page = 1 }) => {
  return (
    <div className="flex items-center space-x-1 mt-8">
      {pages.map((page) => (
        <Link href={`/page/${page}`} key={page}>
          <span
            className={`px-4 py-2 border hover:bg-black hover:text-white ${
              current_page == page && 'bg-black text-white'
            }`}
          >
            {page}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default Pagination;