import React, { FC } from 'react';
import { Flex } from 'theme-ui';
import { BuyOrder } from '@data/models/BuyOrder.model';
import { BuyOrderCard } from '@components/molecules/BuyOrderCard';

type BuyOrderCardListProps = {
  buyOrders: BuyOrder[];
}

export const BuyOrderCardList: FC<BuyOrderCardListProps> = ({
  buyOrders,
}) => {
  return (
    <Flex
      sx={{
        gap: '20px',
        flexWrap: 'wrap'
      }}
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
