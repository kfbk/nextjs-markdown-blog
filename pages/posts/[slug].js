import fs from 'fs';
import matter from 'gray-matter';
// import ReactMarkdown from 'react-markdown';
// import markdownit from 'markdown-it';
import Image from 'next/image';
import Link from 'next/link';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify'
import remarkToc from 'remark-toc';

//--------------------------------
// 2番目に呼ばれる
// 記事の内容について記事一覧と同様にここを利用して取得
// paramsには下記pathsで指定した値が入る（1postずつ）
// 疑問：どこで１つが選ばれるのか
export async function getStaticProps({ params }) {
  // console.log('params:', params);
  //    params: { slug: 'satou01' }
  const file = fs.readFileSync(`posts/${params.slug}.md`, 'utf-8');
  // 次のように、ファイル内容が得られる
  // console.log(file);
  // return { props: { post: '' } };
  const { data, content } = matter(file);
  const result = await unified()
    .use(remarkParse)
    .use(remarkToc)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(content);
    // console.log('html:', result.toString());
  return { props: { frontMatter: data, content: result.toString()  } };
}

//--------------------------------
// 1番目に呼ばれる
// ダイナミックルーティングを利用している場合は
// getStaticPropsに加えてここの設定が必要
// 個別の記事ページのパスを得る
export async function getStaticPaths() {
  // console.log("getStaticPaths")
  const files = fs.readdirSync('posts');

  // 全てのmdファイルの拡張子を除いたものを得てpathsとする
  // const paths = files.map((fileName) => ({
  //   params: {
  //     slug: fileName.replace(/\.md$/, ''),
  //   },
  // }));
  // 次は、上と同じ動作をした
  // mapで回しでブログのid(そのブログがそのブログであると判別できる一意の値)を取得
  const paths = files.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    }
  });
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
    // fallback：事前ビルドしたパス以外にアクセスしたときのパラメータ
    //  true:カスタム404Pageを表示 false:404pageを表示
    fallback: false,
  };
}

//--------------------------------
// 3番目に呼ばれる
// ここのメイン
// 2番目に呼ばれたgetStaticPropsから取得した引数
const Post = ({ frontMatter, content }) => {
  // console.log("frontMatter=", frontMatter)
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
      {/* <div className="space-x-2">
        {frontMatter.categories.map((category) => (
          <span key={category}>
            カテゴリー：
            <Link href={`/categories/${category}`}>
              {category}
            </Link>
          </span>
        ))}
      </div> */}
      {/* {toReactNode(content)}  aタグをLinkタグに変換 */}
      {/* <div dangerouslySetInnerHTML={{ __html: markdownit().render(content) }}></div> */}
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </div>
  );
};

export default Post;