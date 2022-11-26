import { NextPage } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { FloatingIncludedCountries } from '@components/organisms/FloatingIncludedCountries';
import { BuyOrderCardList } from '@components/organisms/BuyOrderCardList';
import { useGetBuyOrders } from '@hooks/useGetBuyOrders';
import { CountryState, useCountries } from '@store/countries';
import React, { useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { PageHeader } from '@components/atoms/PageHeader';
import { ShowingResultsFrom } from '@components/molecules/ShowingResultsFrom';
import { Container } from 'theme-ui';

const BuyOrdersPage: NextPage = () => {
  const { countries, selectedCountries, setCountries } = useCountries();
  const { buyOrders, isError, refetch } = useGetBuyOrders(selectedCountries);
  const { t } = useTranslation();

  useEffect(() => {
    refetch();
  }, [refetch, selectedCountries]);

  if (isError) {
    return <h3>{t('buy_orders_could_not_be_fetched', 'Buy Orders could not be fetched')}</h3>
  }

  function onSetCountries(country: CountryState) {
    setCountries(
      countries.map((c: CountryState) => c.countryCode === country.countryCode
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

        <ShowingResultsFrom totalResults={buyOrders.length} />

        <BuyOrderCardList buyOrders={buyOrders} />
      </Container>
      <FloatingIncludedCountries
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
