import Link from 'next/link';
import Image from 'next/image';

const PostCard = ({ post }) => {
  return (
    <Link href={`/posts/${post.slug}`}>
      <div className="border round-lg">
        {/* height={10} 比率は無視される */}
        <Image
          src={`/${post.frontMatter.image}`}
          width={800}
          height={10}
          alt={post.frontMatter.title}
        />
      </div>
      <div className="px-2 py-4">
        <h1 className="font-bold text-lg">
          <span>{post.frontMatter.title}</span>
        </h1>
        <span>{post.frontMatter.date}</span>
      </div>
    </Link>
  );
};

export default PostCard;