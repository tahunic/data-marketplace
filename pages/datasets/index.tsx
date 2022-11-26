import { NextPage } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Header } from '@components/molecules/Header';
import { Dataset } from '@data/models/Dataset.model';
import getConfig from 'next/config';
import { DatasetCardList } from '@components/organisms/DatasetCardList';
import { IncludedCountries } from '@components/molecules/IncludedCountries';
import { useCountries } from '@store/countries';
import { useEffect } from 'react';
import { Country } from '@data/models/Country.model';

type DatasetsProps = {
  datasets: Dataset[];
  countries: Country[];
}

const Datasets: NextPage<DatasetsProps> = ({
  datasets,
  countries,
}) => {
  const { setCountries } = useCountries();
  useEffect(() => {
    setCountries(countries.map((country: Country) => ({ ...country, selected: true })));
  }, [countries, setCountries]);

  return (
    <>
      <Head>
        <title>Datasets | Data Marketplace</title>
        <meta name="description" content="Datasets description for SEO" />
      </Head>
      <Header />
      <DatasetCardList datasets={datasets} />
      <IncludedCountries />
    </>
  );
};

export async function getServerSideProps({ locale }: { locale: string }) {
  const { publicRuntimeConfig } = getConfig();
  const datasets = await fetch(`${publicRuntimeConfig.nextPublicApiBaseUri}/datasets`).then(res => res.json());

  return {
    props: {
      datasets,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}

export default Datasets;
