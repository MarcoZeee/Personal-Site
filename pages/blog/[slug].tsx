import Head from 'next/head';
import { GetStaticPaths, GetStaticPropsResult, NextPage } from 'next';
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

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: Object.keys(POSTS).map((slug) => ({
      params: {
        slug,
      },
    })),
    fallback: false,
  };
};

type Params = {
  params: {
    slug: keyof typeof POSTS;
  };
};

export const getStaticProps = async ({
  params: { slug },
}: Params) => {
  const { uri, date } = POSTS[slug];
  const recordMap = await notion.getPage(uri);
  const pageInfo = getPageInfo(recordMap);
  const page = {
    ...pageInfo,
    date,
  };

  return {
    props: {
      page,
    },
  };
};

export default Blog;
