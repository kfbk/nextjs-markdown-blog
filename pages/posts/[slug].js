import fs from 'fs';
import matter from 'gray-matter';
// import ReactMarkdown from 'react-markdown';
import markdownit from 'markdown-it';
import Image from 'next/image';

export async function getStaticProps({ params }) {
  // console.log('params:', params);
  // 次の様に、選ばれた1つが得られる
  // params: { slug: 'satou01' }
  const file = fs.readFileSync(`posts/${params.slug}.md`, 'utf-8');
  // 次のように、ファイル内容が得られる
  // console.log(file);
  // return { props: { post: '' } };
  const { data, content } = matter(file);
  return { props: { frontMatter: data, content } };
}

export async function getStaticPaths() {
  const files = fs.readdirSync('posts');
  // (fileName) => ({ を (fileName) => { にするとエラーになる
  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace(/\.md$/, ''),
    },
  }));
  // console.log('paths:', paths);
  // 次の様に、配列を返す
  // paths: [
  //   { params: { slug: 'next-js-markdown-blog' } },
  //   { params: { slug: 'satou01' } },
  //   { params: { slug: 'satou02' } },
  //   { params: { slug: 'satou03' } }
  // ]
  return {
    paths,
    fallback: false,
  };
}

// const Post = () => {
//   return <div>コンテンツ</div>;
const Post = ({ frontMatter, content }) => {
  console.log("frontMatter=", frontMatter)
  return (
    <div className="prose prose-lg max-w-none">
      <div className="border">
        <Image
          src={`/${frontMatter.image}`}
          width={500}
          height={10}
          alt={frontMatter.title}
        />
      </div>
      <h1 className="mt-12">{frontMatter.title}</h1>
      <span>{frontMatter.date}</span>
      {/* <div>{content}</div> */}
      {/* <ReactMarkdown>{content}</ReactMarkdown> */}
      <div dangerouslySetInnerHTML={{ __html: markdownit().render(content) }}></div>
    </div>
  );
};

export default Post;