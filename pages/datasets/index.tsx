import { NextPage } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Header } from '@components/molecules/Header';
import { Dataset } from '@data/models/Dataset.model';
import { DatasetCardList } from '@components/organisms/DatasetCardList';
import { IncludedCountries } from '@components/molecules/IncludedCountries';

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
      <DatasetCardList datasets={datasets} />
      <IncludedCountries />
    </>
  );
};

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}

export default Datasets;
