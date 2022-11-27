import React, { FC } from 'react';
import { Dataset } from '@data/models/Dataset.model';
import { DatasetCard } from '@components/molecules/DatasetCard';
import { Country } from '@data/models/Country.model';
import { Flex } from '@components/atoms/Flex';

type DatasetCardListProps = {
  datasets: Dataset[];
}

export const DatasetCardList: FC<DatasetCardListProps> = ({
  datasets,
}) => {
  return (
    <Flex
      gap="40px"
      sx={{ flexWrap: 'wrap' }}
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
