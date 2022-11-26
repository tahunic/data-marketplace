import React, { FC } from 'react';
import { Flex, Text } from 'theme-ui';
import { FieldLabel } from '@components/atoms/FieldLabel';
import { useTranslation } from 'next-i18next';
import { theme } from '@styles/theme';
import { format } from 'date-fns';

type BuyOrderCardProps = {
  orderName: string;
  dateCreated: Date;
  budget: number;
}

export const BuyOrderCard: FC<BuyOrderCardProps> = ({
  orderName,
  dateCreated,
  budget,
}) => {
  const { t } = useTranslation();
  return (
    <Flex
      p={24}
      sx={{
        width: '100%',
        background: theme.colors?.cardBackground,
      }}
    >
      <Flex sx={{ gap: '5px', flexDirection: 'column', width: '33%' }}>
        <FieldLabel>{t('order_name', 'Order name')}</FieldLabel>
        <Text>{orderName}</Text>
      </Flex>
      <Flex sx={{ gap: '5px', flexDirection: 'column', width: '33%' }}>
        <FieldLabel>{t('date_created', 'Date Created')}</FieldLabel>
        <Text>{format(new Date(dateCreated), 'MM/dd/yyyy')}</Text>
      </Flex>
      <Flex sx={{ gap: '5px', flexDirection: 'column', width: '33%' }}>
        <FieldLabel>{t('budget', 'Budget')}</FieldLabel>
        <Text>${budget}</Text>
      </Flex>
    </Flex>
  );
};
