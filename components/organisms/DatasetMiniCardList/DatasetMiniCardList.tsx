import React, { FC } from 'react';
import { DatasetSelectable } from '@data/models/Dataset.model';
import { Flex } from 'theme-ui';
import { DatasetMiniCard } from '@components/molecules/DatasetMiniCard';

type DatasetMiniCardListProps = {
  datasets?: DatasetSelectable[];
  onSelect?: (dataset) => void;
  readonly?: boolean;
}

export const DatasetMiniCardList: FC<DatasetMiniCardListProps> = ({
  datasets,
  onSelect,
  readonly = false,
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
          selected={dataset.selected}
          disabled={dataset.disabled}
          onClick={() => !readonly && onSelect && onSelect(dataset)}
        />
      )}
    </Flex>
  );
};
