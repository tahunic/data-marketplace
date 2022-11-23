import { Box, Container } from 'theme-ui';
import getConfig from 'next/config';

export default function Home() {
  const { publicRuntimeConfig } = getConfig();
  const apiUrl = publicRuntimeConfig.nextPublicApiBaseUri;

  return (
    <Container p={4}>
      <Box>
        <h1>API URL</h1>
        <h1>{apiUrl}</h1>
      </Box>
    </Container>
  )
}
