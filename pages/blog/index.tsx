import Head from "next/head";
import { NextPage } from "next";

import { Title, Container, Grid, Card, Text, Link } from "@components";
import { useRouter } from "next/router";

export type BlogEntry = {
  id: string;
  title: string;
  content: string;
  likes: number;
  date?: string;
  image_url?: string;
  paragraphs?: string[];
  description?: string;
};
interface BlogProps {
  pages: BlogEntry[];
  errorCode: number | boolean;
}

const getPages = async () => {
  const result = await fetch("https://old-butterfly-35.deno.dev/api/blogs", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "API_KEY": process.env.API_KEY!,
    },
  });
  const errorCode = result.ok ? false : result.status;
  const pages = await result.json();
  return {
    pages,
    errorCode
  };
}

export const getServerSideProps = async () => {
  const { pages, errorCode } = await getPages();
  return {
    props: {
      pages,
      errorCode
    }
  }
}

const Blog: NextPage<BlogProps> = ({
  pages,
  errorCode
}) => {
  if(errorCode) {
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
        <Text textAlign="center">Error: {errorCode}</Text>
      </Container>
    )
  }
  const router = useRouter();
  const handleClick = (slug: string) => {
    router.push(`/blog/${slug}`);
  };
  const annotatedPages = pages.map((page) => {
      return {
        ...page,
        description: page.content.slice(0, 80) + "...",
      }
    }).sort((a, b) => {
      return b.likes - a.likes;
    });
  

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
        {pages.length === 0? (
          <Text textAlign="center">
            No blog posts yet.
          </Text>
        ):(annotatedPages?.map((blog) => {
          return (
            <Link onClick={(e) => {
              e.preventDefault();
              handleClick(blog.id);
            }} key={blog.title}>
              <Card margin={1}>
                <Container>
                  <Title fontSize={`1.5rem`}>{blog.title}
                  </Title>
                  
                  <Text>{blog.description}</Text>
                  <Text fontSize="0.75rem">❤️ {blog.likes}</Text>
                </Container>
              </Card>
            </Link>
          );
        }))}
      </Grid>
    </Container>
  );
};

export default Blog;
