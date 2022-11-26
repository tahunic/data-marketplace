import { NextPage } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { DatasetCardList } from '@components/organisms/DatasetCardList';
import { FloatingIncludedCountries } from '@components/organisms/FloatingIncludedCountries';
import { useGetDatasets } from '@hooks/useGetDatasets';
import { CountryState, useCountries } from '@store/countries';
import React, { useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { PageHeader } from '@components/atoms/PageHeader';
import { ShowingResultsFrom } from '@components/molecules/ShowingResultsFrom';
import { Container } from 'theme-ui';

const DatasetsPage: NextPage = () => {
  const { countries, selectedCountries, setCountries } = useCountries();
  const { datasets, isError, refetch } = useGetDatasets(selectedCountries);
  const { t } = useTranslation();

  useEffect(() => {
    refetch();
  }, [refetch, selectedCountries]);

  if (isError) {
    return <h3>{t('datasets_could_not_be_fetched', 'Datasets could not be fetched')}</h3>
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
        <title>Datasets | Data Marketplace</title>
        <meta name="description" content="Datasets description for SEO" />
      </Head>
      <Container sx={{ marginBottom: '150px' }}>
        <PageHeader title={t('datasets', 'Datasets')} />

        <ShowingResultsFrom totalResults={datasets.length} />

        <DatasetCardList datasets={datasets} />
      </Container>
      <FloatingIncludedCountries
        countries={countries}
        onSetCountries={onSetCountries}
      />
    </>
  );
};

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}

export default DatasetsPage;
