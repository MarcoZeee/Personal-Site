import Head from 'next/head';
import { Container} from '@components';
import Post from "posts/react.mdx";
// import {MDXProvider} from '@mdx-js/react';

const POSTS = {
  'how-to-learn': {
    title: 'How to learn',
    description: 'How to learn',
    date: '2021-08-01',
  },
};
const Blog = ({page}: {
  page: {
    title: string;
    description: string;
    date: string;
  };
  
}) => (
  <Container width={['100%', 1200]} maxWidth="100vw">
    <Head>
      <title>{page.title}</title>
      <meta property="og:title" content={page.title} />
    </Head>
    <Post />

  </Container>
);

export const getStaticProps = async () => {
  const slug = 'how-to-learn';
  const { title, date } = POSTS[slug];
  const page = {
    title,
    date,
    description: 'How to learn',
  };

  return {
    props: {
      page,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = Object.keys(POSTS).map((slug) => ({
    params: { slug },
  }));
  return {
    paths,
    fallback: false,
  }
}

export default Blog;
