import Head from "next/head";
import { BlogEntry } from "pages/blog";

import { Title, Container, Card, Text } from "@components";

interface ShowBlogProps {
  blog: BlogEntry;
}


export const getStaticPaths = async () => {
  const result = await fetch("https://old-butterfly-35.deno.dev/api/blogs", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "API_KEY": process.env.API_KEY!
    },
  });
  let pages: BlogEntry[];
  try {
    pages = Array.from(await result.json());
  } catch (e) {
    pages = [];
  }
  const paths = pages.map((page: BlogEntry) => ({
    params: { id: page.id.toString() },
  }));
  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps = async ({ params }: any) => {
  const result = await fetch(`https://old-butterfly-35.deno.dev/api/blogs/${params.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "API_KEY": process.env.API_KEY!
    },
  });
  const blog = await result.json();
  const beautifiedBlog = {
    ...blog,
    paragraphs: blog.content.split("\n")
  }
  return {
    props: {
      blog: beautifiedBlog
    },
  };
}

function ShowBlog({ blog }: ShowBlogProps) {
  return (
    <Container maxWidth={1200}>
      <Head>
        <title>{blog.title}</title>
        <meta property="og:title" content={blog.title} />
      </Head>
      <Container mb="3rem">
        <Text textAlign="center">
          Likes: {blog.likes}
        </Text>
      </Container>
      <Card>
        <Container mb="3rem">
          <Title>{blog.title}</Title>
            {blog.paragraphs?.map((paragraph) => {
              return (
              <Text>
                {paragraph}
              </Text>
              );
            })}
        </Container>
      </Card>
    </Container>
  );
}

export default ShowBlog;