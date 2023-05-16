import Head from "next/head";
import { NextPage } from "next";

import { Title, Container, Grid, Card, Text, Link } from "@components";
import { useRouter } from "next/router";
import { blogsInfo } from "text";

type BlogEntry = {
  title: string;
  description: string;
  date: string;
  slug: string;
  image: string;
};
interface BlogProps {
  pages: BlogEntry[];
}


const Blog: NextPage<BlogProps> = () => {
  const router = useRouter();
  const handleClick = (slug: string) => {
    router.push(`/blog/${slug}`);
  };
  return (
    <Container maxWidth={1200}>
      <Head>
        <title>Blog</title>
        <meta property="og:title" content="Blog - Marco Zee" />
      </Head>
      <Container mb="3rem">
        <Title>Blog</Title>
        <Text textAlign="center">
          I write posts about software engineering, tech, and business thinking.
        </Text>
      </Container>
      <Grid gridTemplateColumns={`1fr`} gridGap={`1rem`}>
        {blogsInfo.map((blog) => {
          return (
            <Link href={blog.href} onClick={(e) => {
              e.preventDefault();
              handleClick(blog.href);
            }} key={blog.title}>
              <Card margin={1}>
                <Container>
                  <Title fontSize={`1.5rem`}>{blog.title}</Title>
                  <Text>{blog.description}</Text>
                </Container>
              </Card>
            </Link>
          );
        })}
      </Grid>
      {/* <Grid gridTemplateColumns={["1fr", "1fr 1fr"]} gridGap={["3rem", "2rem"]}>
        {pages.map(({ title, slug, date, cover }, i) => (
          <a
            key={i}
            href={uri}
            onClick={(e) => {
              e.preventDefault();
              handleClick(uri);
            }}
          >
            <Card padding={[0]} margin={[0]}>
              <Grid
                gridTemplateColumns={"1fr"}
                justifyItems={["center", "flex-start"]}
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
                  alignItems={["center", "flex-start"]}
                >
                  <Title
                    as="h2"
                    fontSize="1.5rem"
                    textAlign={["center", "left"]}
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
          </a>
        ))}
      </Grid> */}
    </Container>
  );
};


export default Blog;
