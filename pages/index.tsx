import { Box, Container } from 'theme-ui';
import getConfig from 'next/config';
import { NextPage } from 'next';

const HomePage: NextPage = () => {
  const { publicRuntimeConfig } = getConfig();
  const apiUrl = publicRuntimeConfig.nextPublicApiBaseUri;

  return (
    <Container p={4}>
      <Box>
        <h1>API URL</h1>
        <h1>{apiUrl}</h1>
      </Box>
    </Container>
  );
}

export default HomePage;
