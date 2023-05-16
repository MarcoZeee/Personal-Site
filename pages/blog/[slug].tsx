import Head from 'next/head';
import { Container, Text, Title } from '@components';

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
    <Container maxWidth="700px" margin="0 auto">
      <Title>{page.title}</Title>
      <Text textAlign="center">{page.description}</Text>
    </Container>

    <Container textAlign="center" gridGap=".4rem" my="3rem">
      <Text margin={0}>Marco Zee</Text>
      <small>{page.date}</small>
    </Container>
  </Container>
);

export const getStaticProps = async () => {
  const slug = 'how-to-learn';
  const { title, date } = POSTS[slug];
  const page = {
    title,
    date,
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
