import Link from 'next/link';
import Image from 'next/image';

const PostCard = ({ post }) => {
  return (
    <Link href={`/posts/${post.slug}`}>
      <div className="border rounded-lg">
        {/* height={10} 比率は無視される */}
        <Image
          src={`/${post.frontMatter.image}`}
          width={500}
          height={10}
          alt={post.frontMatter.title}
        />
      </div>
      <div className="px-2 py-4">
        <h1 className="font-bold text-lg">
          {post.frontMatter.title}
        </h1>
        <span>{post.frontMatter.date}</span>
      </div>
    </Link>
  );
};

export default PostCard;