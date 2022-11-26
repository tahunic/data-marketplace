import { NextPage } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { DatasetCardList } from '@components/organisms/DatasetCardList';
import { IncludedCountries } from '@components/molecules/IncludedCountries';
import { useGetDatasets } from '@hooks/useGetDatasets';
import { useCountries } from '@store/countries';
import { useEffect } from 'react';
import { Loader } from '@components/atoms/Loader';
import { useTranslation } from 'next-i18next';

const Datasets: NextPage = () => {
  const { selectedCountries } = useCountries();
  const { datasets, isLoading, isError, refetch } = useGetDatasets();
  const { t } = useTranslation();

  useEffect(() => {
    refetch();
  }, [refetch, selectedCountries]);

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <h3>{t('Datasets could not be fetched', 'Datasets could not be fetched')}</h3>
  }

  if (datasets?.length > 0) {
    return (
      <>
        <Head>
          <title>Datasets | Data Marketplace</title>
          <meta name="description" content="Datasets description for SEO" />
        </Head>
        <DatasetCardList datasets={datasets} />
        <IncludedCountries />
      </>
    );
  }

  return null;
};

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}

export default Datasets;
