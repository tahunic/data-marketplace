import React, { FC } from 'react';
import { Flex } from 'theme-ui';
import { Dataset } from '@data/models/Dataset.model';
import { DatasetCard } from '@components/molecules/DatasetCard';
import { Country } from '@data/models/Country.model';

type DatasetCardListProps = {
  datasets: Dataset[];
}

export const DatasetCardList: FC<DatasetCardListProps> = ({
  datasets,
}) => {
  return (
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
  );
};
