import Head from 'next/head';
import styled from 'styled-components';
import { GetStaticPropsResult, NextPage } from 'next';
import { NotionAPI } from 'notion-client';

import { getPageInfo, Page, POSTS } from '@posts/notion';
import { Title, Link, Container, Grid, Card, Image, Text } from '@components';

interface BlogProps {
  pages: Page[];
}

const BlogImage = styled(Image)`
  border-radius: 5px;
`;

const Blog: NextPage<BlogProps> = ({ pages }) => {
  return (
    <Container maxWidth={1200}>
      <Head>
        <title>Blog</title>
        <meta property="og:title" content="Blog – Marco Zee" />
      </Head>
      <Container mb="3rem">
        <Title>Blog</Title>
        <Text textAlign="center">
          I write posts about software engineering, tech, and business thinking.
        </Text>
      </Container>
      <Grid>
        <Link href={`https://medium.com/@marcozee/understanding-event-loop-a-react-approach-c3a8f4992869`}>
          <Card margin={1}>
            Event Loop with React Deep Dive 
          </Card>
        </Link>
        <Link href={`https://medium.com/@marcozee/why-you-and-your-company-probably-shouldnt-use-vue-the-hard-way-b9d00f2ef8f4`}>
          <Card margin={1}>
            Frontend Migration from Vue to React 
          </Card>
        </Link>
      </Grid>
      <Grid gridTemplateColumns={['1fr', '1fr 1fr']} gridGap={['3rem', '2rem']}>
        {pages.map(({ title, uri, date, cover }, i) => (
          <Link key={i} href={uri}>
            <Card padding={[0]} margin={[0]}>
              <Grid
                gridTemplateColumns={'1fr'}
                justifyItems={['center', 'flex-start']}
                gridGap="1rem"
              >
                {cover && (
                  <BlogImage
                    src={cover}
                    width="100%"
                    height="auto"
                    alt={title}
                  />
                )}
                <Container
                  gridGap=".5rem"
                  alignItems={['center', 'flex-start']}
                >
                  <Title
                    as="h2"
                    fontSize="1.5rem"
                    textAlign={['center', 'left']}
                    margin={0}
                  >
                    {title}
                  </Title>
                  <Text margin={0} fontWeight="initial" fontSize=".9rem">
                    {date}
                  </Text>
                </Container>
              </Grid>
            </Card>
          </Link>
        ))}
      </Grid>
    </Container>
  );
};

const notion = new NotionAPI();

export const getStaticProps = async (): Promise<
  GetStaticPropsResult<BlogProps>
> => {
  const pages: Page[] = [];
  await Promise.all(
    Object.keys(POSTS).map(async (key) => {
      const { uri, date } = POSTS[key as keyof typeof POSTS];
      const page = await notion.getPage(uri);
      if (page) {
        const info = getPageInfo(page);
        if (info.title !== 'Blog') {
          pages.push({
            ...info,
            date,
            uri: `/blog/${key}`,
          });
        }
      }
    }),
  );

  return {
    props: {
      pages: pages.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      ),
    },
  };
};

export default Blog;
