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
import { usePutBuyOrder } from '@hooks/usePutBuyOrder';
import { BuyOrder } from '@data/models/BuyOrder.model';

type BuyOrderDetailsProps = {
  buyOrderId: number;
}

const BuyOrderDetailsPage: NextPage<BuyOrderDetailsProps> = ({
  buyOrderId,
}) => {
  const { t } = useTranslation();
  const { countries } = useCountries();
  const { buyOrder, isLoading, isError } = useGetBuyOrder(buyOrderId);
  const { putBuyOrder } = usePutBuyOrder();
  const { datasets, isLoading: isDatasetsLoading, isError: isDatasetsError } = useGetDatasets(countries);

  function onSubmit(form): void {
    const { id, name, budget, createdAt, datasets, countries } = form;
    const payload = {
      name,
      budget,
      createdAt,
      datasetIds: datasets.filter(c => c.selected).map(d => d.id),
      countries: countries.filter(c => c.selected).map(c => c.countryCode),
    } as BuyOrder;
    putBuyOrder({ id, payload });
  }

  if (isLoading || isDatasetsLoading) {
    return <Loader />;
  }

  if (isError || isDatasetsError) {
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
            id={buyOrder.id}
            orderName={buyOrder.name}
            dateCreated={buyOrder.createdAt}
            budget={buyOrder.budget}
            datasets={datasets.map(dataset => ({
              ...dataset,
              selected: buyOrder.datasetIds?.includes(dataset.id),
            }))}
            countries={countries.map(country => ({
              ...country,
              selected: buyOrder.countries?.includes(country.countryCode),
            }))}
            onSubmit={onSubmit}
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
