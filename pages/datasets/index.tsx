import { NextPage } from 'next';
import { Box, Container, Text } from 'theme-ui';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Header } from '@components/molecules/Header';

const Datasets: NextPage = () => {
  let { t } = useTranslation();
  return (
    <>
      <Head>
        <title>Datasets | Data Marketplace</title>
        <meta name="description" content="Datasets description for SEO" />
      </Head>
      <Header />
      <Container>
        <Box>
          <Text
            as="h1"
            sx={{
              textAlign: 'center',
              margin: '30px 0 15px 0',
            }}
          >
            {t('datasets', 'Datasets')}
          </Text>
        </Box>
      </Container>
    </>
  );
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default Datasets;
