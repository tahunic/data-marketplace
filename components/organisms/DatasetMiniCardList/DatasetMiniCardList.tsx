import React, { FC } from 'react';
import { Flex } from '@components/atoms';
import { DatasetMiniCard } from '@components/molecules';
import { DatasetSelectable } from '@data/models';

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
      gap="10px"
      sx={{ flexWrap: 'wrap' }}
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
