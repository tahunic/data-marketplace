import { NextPage } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { IncludedCountries } from '@components/molecules/IncludedCountries';
import { BuyOrderCardList } from '@components/organisms/BuyOrderCardList';
import { useGetBuyOrders } from '@hooks/useGetBuyOrders';
import { useCountries } from '@store/countries';
import { useEffect } from 'react';
import { useTranslation } from 'next-i18next';

const BuyOrders: NextPage = () => {
  const { selectedCountries } = useCountries();
  const { buyOrders, isError, refetch } = useGetBuyOrders();
  const { t } = useTranslation();

  useEffect(() => {
    refetch();
  }, [refetch, selectedCountries]);

  if (isError) {
    return <h3>{t('buy_orders_could_not_be_fetched', 'Buy Orders could not be fetched')}</h3>
  }

  return (
    <>
      <Head>
        <title>Buy Orders | Data Marketplace</title>
        <meta name="description" content="Buy orders description for SEO" />
      </Head>
      <BuyOrderCardList buyOrders={buyOrders} />
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
