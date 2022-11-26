import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useGetBuyOrder } from '@hooks/useGetBuyOrder';
import { Loader } from '@components/atoms/Loader';
import React from 'react';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import { BuyOrderDetails } from '@components/organisms/BuyOrderDetails/BuyOrderDetails';
import { useGetDatasets } from '@hooks/useGetDatasets';
import { Container } from 'theme-ui';
import { PageHeader } from '@components/atoms/PageHeader';
import { useCountries } from '@store/countries';

type BuyOrderDetailsProps = {
  buyOrderId: number;
}

const BuyOrderDetailsPage: NextPage<BuyOrderDetailsProps> = ({
  buyOrderId,
}) => {
  const { countries } = useCountries();
  const { buyOrder, isLoading, isError } = useGetBuyOrder(buyOrderId);
  const { datasets } = useGetDatasets(countries);
  const { t } = useTranslation();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <h3>{t('buy_order_could_not_be_fetched', 'Buy Order could not be fetched')}</h3>
  }

  if (buyOrder) {
    return (
      <>
        <Head>
          <title>Buy Order Details | Data Marketplace</title>
          <meta name="description" content="Buy Order description for SEO" />
        </Head>
        <Container sx={{ width: '680px' }}>
          <PageHeader title={t('buy_order_details', 'Buy Order Details')} />

          <BuyOrderDetails
            orderName={buyOrder.name}
            dateCreated={buyOrder.createdAt}
            budget={buyOrder.budget}
            datasets={datasets}
            countries={countries}
            includedDatasetIds={buyOrder.datasetIds}
            includedCountryIds={buyOrder.countries}
          />
        </Container>
      </>
    );
  }

  return null;
};

export async function getServerSideProps({ locale, query }) {
  const buyOrderId = query?.id;
  return {
    props: {
      buyOrderId,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default BuyOrderDetailsPage;
