import React, { FC } from 'react';
import { Flex } from '@components/atoms';
import { BuyOrderCard } from '@components/molecules';
import { BuyOrder } from '@data/models/BuyOrder.model';

type BuyOrderCardListProps = {
  buyOrders: BuyOrder[];
}

export const BuyOrderCardList: FC<BuyOrderCardListProps> = ({
  buyOrders,
}) => {
  return (
    <Flex
      gap="20px"
      sx={{ flexWrap: 'wrap' }}
    >
      {buyOrders.map((buyOrder: BuyOrder) => (
        <BuyOrderCard
          key={buyOrder.id}
          id={buyOrder.id}
          orderName={buyOrder.name}
          dateCreated={buyOrder.createdAt}
          budget={buyOrder.budget}
        />
      ))}
    </Flex>
  );
};
