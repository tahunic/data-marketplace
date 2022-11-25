import { NextPage } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Header } from '@components/molecules/Header';
import { Dataset } from '@data/models/Dataset.model';
import getConfig from 'next/config';
import { DatasetCardList } from '@components/organisms/DatasetCardList';

type DatasetsProps = {
  datasets: Dataset[];
}

const Datasets: NextPage<DatasetsProps> = ({
  datasets,
}) => {
  return (
    <>
      <Head>
        <title>Datasets | Data Marketplace</title>
        <meta name="description" content="Datasets description for SEO" />
      </Head>
      <Header />
      <DatasetCardList datasets={datasets} />
    </>
  );
};

export async function getServerSideProps({ locale }: { locale: string }) {
  const { publicRuntimeConfig } = getConfig();
  const res = await fetch(`${publicRuntimeConfig.nextPublicApiBaseUri}/datasets`);
  const datasets = await res.json();

  return {
    props: {
      datasets,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}

export default Datasets;
