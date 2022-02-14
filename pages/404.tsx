import React from "react";
import { Container, Title, Text } from "@components";

const NotFound = (): JSX.Element => (
  <Container alignItems="center">
    <Title>Opps, maybe the data is not here</Title>
    <Text>try talk to the owner of this site </Text>
  </Container>
);

export default NotFound;
