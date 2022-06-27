import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { Container, Title, Button, Grid, Link, Text } from "@components";
import styles from "@styles/Home.module.css";

const Home = (): JSX.Element => (
  <Container>
    <Container
      justifyContent="center"
      alignContent="center"
      alignItems="center"
      textAlign="center"
      paddingY="25px"
      paddingBottom="40px"
      gridGap="4rem"
    >
      <Container alignItems="center" alignContent="center">
        <Image
          src="/me.jpg"
          alt="Marco Zee"
          width="200px"
          height="200px"
          objectFit="cover"
          className={styles.image}
        />
        <Title>Marco Zee</Title>
        <Title
          fontSize="2rem"
          color="rgba(0, 0, 0, 0.6)"
          fontWeight="500"
          as="h2"
        >
          I compose and pipe.
        </Title>
      </Container>
      <Container maxWidth="700px" gridGap="3rem">
        <Container>
          <Text textAlign="center">
            Fullstack | React | TypeScript | Functional | NodeJS | GraphQL |
          </Text>
        </Container>
        <Link href="/about">
          <Button>More info... &rarr;</Button>
        </Link>
      </Container>
    </Container>

    <Container alignItems="center" paddingY="4rem">
      <Container maxWidth="600px" alignItems="center" alignContent="center">
        <Title fontSize="3rem" as="h3">
          Check me out here
        </Title>
        <Text textAlign="center">Also a Medium writer</Text>
        <Grid
          gridGap="2rem"
          marginTop="2rem"
          gridTemplateColumns={["1fr", "repeat(2, 1fr)"]}
          justifyItems="stretch"
          alignItems="stretch"
        >
          <Link href="https://medium.com/@marcozee">
            <Button width="100%">
              <motion.span
                initial={{ display: "inline-block" }}
                animate={{ rotate: [0, 14, -8, 14, -4, 10, 0, 0] }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 2.5,
                }}
              >
                🤟
              </motion.span>{" "}
              Say hi
            </Button>
          </Link>
          <Link target="_blank" href="mailto:marcoshihh@yahoo.ca">
            <Button
              width="100%"
              backgroundColor="rgb(226,232,240)"
              color="black"
              variant="secondary"
            >
              Request for Resume
            </Button>
          </Link>
        </Grid>
      </Container>
    </Container>
  </Container>
);

export default Home;
