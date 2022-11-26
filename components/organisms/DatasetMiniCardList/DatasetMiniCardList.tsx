import React, { FC } from 'react';
import { Dataset } from '@data/models/Dataset.model';
import { Flex } from 'theme-ui';
import { DatasetMiniCard } from '@components/molecules/DatasetMiniCard';
import { theme } from '@styles/theme';

type DatasetMiniCardListProps = {
  datasets?: Dataset[];
}

export const DatasetMiniCardList: FC<DatasetMiniCardListProps> = ({
  datasets,
}) => {
  return (
    <Flex
      sx={{
        gap: '10px',
        flexWrap: 'wrap',
    }}
    >
      {datasets?.map(dataset =>
        <DatasetMiniCard
          key={dataset.id}
          title={dataset.label}
          thumbnailSrc={dataset.thumbnailUrl}
          thumbnailAlt={dataset.name}
          pricePerRecord={dataset.costPerRecord}
        />
      )}
    </Flex>
  );
};
