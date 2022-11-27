import React, { FC } from 'react';
import { Country, Dataset } from '@data/models';
import { Flex } from '@components/atoms';
import { DatasetCard } from '@components/molecules';

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
