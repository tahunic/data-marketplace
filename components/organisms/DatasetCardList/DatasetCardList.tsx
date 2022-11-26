import React, { FC } from 'react';
import { Box, Container, Flex, Text } from 'theme-ui';
import { useTranslation } from 'next-i18next';
import { Dataset } from '@data/models/Dataset.model';
import { DatasetCard } from '@components/molecules/DatasetCard';
import { ShowingResultsFrom } from '@components/molecules/ShowingResultsFrom';
import { Country } from '@data/models/Country.model';
import { PageHeader } from '@components/atoms/PageHeader';

type DatasetCardListProps = {
  datasets: Dataset[];
}

export const DatasetCardList: FC<DatasetCardListProps> = ({
  datasets,
}) => {
  let { t } = useTranslation();

  return (
    <Container sx={{ marginBottom: '150px' }}>
      <Box>
        <PageHeader title={t('datasets', 'Datasets')} />

        <ShowingResultsFrom totalResults={datasets.length} />

        <Flex
          sx={{
            gap: '40px',
            flexWrap: 'wrap'
          }}
        >
          {datasets.map(dataset => (
            <DatasetCard
              key={dataset.id}
              title={dataset.label}
              thumbnailSrc={dataset.thumbnailUrl}
              thumbnailAlt={dataset.name}
              description={dataset.description}
              pricePerRecord={dataset.costPerRecord}
              availableRecords={dataset.availableRecords}
              countries={dataset.includedCountries?.map((c: Country) => c.name)}
            />
          ))}
        </Flex>
      </Box>
    </Container>
  );
};
