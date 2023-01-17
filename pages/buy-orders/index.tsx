import React, { useEffect } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Container } from 'theme-ui';
import { Button, PageHeader } from '@components/atoms';
import { ShowingResultsFrom } from '@components/molecules';
import { BuyOrderCardList, FloatingCountryControl } from '@components/organisms';
import { useGetBuyOrders } from '@hooks/useGetBuyOrders';
import { CountrySelectable, useCountries } from '@store/countries';
import { ROUTES } from '@data/routes';

const BuyOrdersPage: NextPage = () => {
  const { countries, selectedCountries, setCountries } = useCountries();
  const { buyOrders, isError, refetch } = useGetBuyOrders(selectedCountries);
  const { t } = useTranslation();
  const { push } = useRouter();

  useEffect(() => {
    refetch();
  }, [refetch, selectedCountries]);

  if (isError) {
    return <h3>{t('buy_orders_could_not_be_fetched', 'Buy Orders could not be fetched')}</h3>
  }

  function onSetCountries(country: CountrySelectable) {
    setCountries(
      countries.map((c: CountrySelectable) => c.countryCode === country.countryCode
        ? { ...c, selected: !c.selected }
        : c
      ))
  }

  return (
    <>
      <Head>
        <title>Buy Orders | Data Marketplace</title>
        <meta name="description" content="Buy orders description for SEO" />
      </Head>
      <Container sx={{ marginBottom: '150px', width: '680px' }}>
        <PageHeader title={t('buy_orders', 'Buy Orders')} />

        <Button
          px={0}
          sx={{ textDecoration: 'underline' }}
          onClick={() => push(`${ROUTES.BUY_ORDERS}/create`)}
        >
          {t('create_new_order', 'Create new order')}
        </Button>

        <ShowingResultsFrom
          totalResults={buyOrders.length}
          countryNames={selectedCountries?.map(country => country.name)?.join(', ')}
        />

        <BuyOrderCardList buyOrders={buyOrders} />
      </Container>
      <FloatingCountryControl
        countries={countries}
        onSetCountries={onSetCountries}
      />
    </>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default BuyOrdersPage;
