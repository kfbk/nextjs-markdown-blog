// import Head from 'next/head'
// import Image from 'next/image'
// import { Inter } from 'next/font/google'
// import styles from '@/styles/Home.module.css'
// const inter = Inter({ subsets: ['latin'] })
import fs from 'fs';              // fileSystem
import matter from 'gray-matter'  // —で囲まれたメタ情報
// import Link from 'next/link';
import PostCard from '../components/PostCard';

// MDファイルを読む
export const getStaticProps = () => {
  const files = fs.readdirSync('posts');
  const posts = files.map((fileName) => {
    // slug：拡張子なしのファイル名
    const slug = fileName.replace(/\.md$/, ''); 
    const fileContent = fs.readFileSync(`posts/${fileName}`, 'utf-8');
    // data：Matter(—で囲まれたメタ情報)取り出し
    // const { data, content } = matter(fileContent);
    const { data } = matter(fileContent);
    // console.log('data:', data);
    // console.log('content:', content);
    return {
      frontMatter: data,
      slug,
    }
  });
  // 記事順に並ぶようにソートの機能を追加
  const sortedPosts = posts.sort((postA, postB) =>
    new Date(postA.frontMatter.date) > new Date(postB.frontMatter.date) ? -1 : 1
  )
  return {
    props: {
      // posts: [],
      posts: sortedPosts,
    },
  };
}

// メインルーチン
export default function Home({ posts }) {
  // console.log("posts=", posts)
  return (
    <>
      <div className="my-8">
        <div className="grid grid-cols-3 gap-4">
        {posts.map((post) => (
          // PostCard.js に移動する
          // <div key={post.slug}>
          //   <Link href={`/post/${post.slug}`}>
          //     {post.frontMatter.title}
          //   </Link>
          // </div>
          <PostCard key={post.slug} post={post} />
        ))}
        </div>
      </div>
    </>
  )
}
