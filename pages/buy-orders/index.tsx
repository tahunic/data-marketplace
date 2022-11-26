import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import { Header } from '@components/molecules/Header';
import { Box, Container, Text } from 'theme-ui';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { IncludedCountries } from '@components/molecules/IncludedCountries';

const BuyOrders: NextPage = () => {
  let { t } = useTranslation();
  return (
    <>
      <Head>
        <title>Buy Orders | Data Marketplace</title>
        <meta name="description" content="Buy orders description for SEO" />
      </Head>
      <Container>
        <Box>
          <Text
            as="h1"
            sx={{
              textAlign: 'center',
              margin: '30px 0 20px 0',
            }}
          >
            {t('buy_orders', 'Buy Orders')}
          </Text>
        </Box>
      </Container>
      <IncludedCountries />
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

export default BuyOrders;
