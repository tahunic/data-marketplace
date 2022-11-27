import React, { FC } from 'react';
import { Text } from 'theme-ui';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { format } from 'date-fns';
import { Flex, FieldLabel } from '@components/atoms';
import { theme } from '@styles/theme';
import { ROUTES } from '@data/routes';

type BuyOrderCardProps = {
  id: number;
  orderName: string;
  dateCreated: Date;
  budget: number;
}

export const BuyOrderCard: FC<BuyOrderCardProps> = ({
  id,
  orderName,
  dateCreated,
  budget,
}) => {
  const { t } = useTranslation();
  const { push } = useRouter();

  return (
    <Flex
      p={24}
      width="100%"
      sx={{
        background: theme.colors?.cardBackground,
        cursor: 'pointer',
        ':hover': {
          background: theme.colors?.muted,
          transition: 'background-color 0.6s ease'
        }
      }}
      onClick={() => push(`${ROUTES.BUY_ORDERS}/${id}`)}
    >
      <Flex
        flexDirection="column"
        width="33%"
      >
        <FieldLabel>{t('order_name', 'Order name')}</FieldLabel>
        <Text>{orderName}</Text>
      </Flex>
      <Flex
        flexDirection="column"
        width="33%"
      >
        <FieldLabel>{t('date_created', 'Date Created')}</FieldLabel>
        <Text>{format(new Date(dateCreated), 'MM/dd/yyyy')}</Text>
      </Flex>
      <Flex
        flexDirection="column"
        width="33%"
      >
        <FieldLabel>{t('budget', 'Budget')}</FieldLabel>
        <Text>${budget}</Text>
      </Flex>
    </Flex>
  );
};
