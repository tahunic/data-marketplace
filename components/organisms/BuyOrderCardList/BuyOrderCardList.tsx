import React, { FC } from 'react';
import { Box, Container, Flex } from 'theme-ui';
import { useTranslation } from 'next-i18next';
import { ShowingResultsFrom } from '@components/molecules/ShowingResultsFrom';
import { BuyOrder } from '@data/models/BuyOrder.model';
import { BuyOrderCard } from '@components/molecules/BuyOrderCard';
import { Country } from '@data/models/Country.model';
import { PageHeader } from '@components/atoms/PageHeader';

type BuyOrderCardListProps = {
  buyOrders: BuyOrder[];
}

export const BuyOrderCardList: FC<BuyOrderCardListProps> = ({
  buyOrders,
}) => {
  let { t } = useTranslation();

  return (
    <Container sx={{ marginBottom: '150px', width: '680px' }}>
      <Box>
        <PageHeader title={t('buy_orders', 'Buy Orders')} />

        <ShowingResultsFrom totalResults={buyOrders.length} />

        <Flex
          sx={{
            gap: '40px',
            flexWrap: 'wrap'
          }}
        >
          {buyOrders.map((buyOrder: BuyOrder) => (
            <BuyOrderCard
              key={buyOrder.id}
              orderName={buyOrder.name}
              dateCreated={buyOrder.createdAt}
              budget={buyOrder.budget}
            />
          ))}
        </Flex>
      </Box>
    </Container>
  );
};
