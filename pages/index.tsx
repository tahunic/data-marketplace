import { Box, Container, Spinner } from 'theme-ui';
import getConfig from 'next/config';
import { NextPage } from 'next';
import { Button } from '@components/atoms/Button';
import { useState } from 'react';

const HomePage: NextPage = () => {
  const { publicRuntimeConfig } = getConfig();
  const apiUrl = publicRuntimeConfig.nextPublicApiBaseUri;
  let [loading, setLoading] = useState(false);

  return (
    <Container p={4}>
      <Box>
        <h1>API URL</h1>
        <h1>{apiUrl}</h1>
        <Button
          variant="secondary"
          onClick={() => {
            setLoading(true);
            setTimeout(() => setLoading(false), 1000);
          }}
          loading={loading}
        >
          Test
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;
