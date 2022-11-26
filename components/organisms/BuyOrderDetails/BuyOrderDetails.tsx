import React, { FC } from 'react';
import { Flex, Text } from 'theme-ui';
import { Dataset } from '@data/models/Dataset.model';
import { Country } from '@data/models/Country.model';
import { FieldLabel } from '@components/atoms/FieldLabel';
import { useTranslation } from 'next-i18next';
import { format } from 'date-fns';
import { theme } from '@styles/theme';
import { Button } from '@components/atoms/Button';

type BuyOrderDetailsProps = {
  orderName: string;
  dateCreated: Date;
  budget: number;
  datasets: Dataset[];
  includedDatasets: number[];
  countries: Country[];
  includedCountries: string[];
}

export const BuyOrderDetails: FC<BuyOrderDetailsProps> = ({
  orderName,
  dateCreated,
  budget,
  datasets,
  includedDatasets,
  countries,
  includedCountries,
}) => {
  const { t } = useTranslation();

  return (
    <Flex
      p={'24px 50px'}
      sx={{
        backgroundColor: theme.colors?.cardBackground,
        gap: '20px',
        flexDirection: 'column',
        marginBottom: '50px',
      }}
    >
      <Flex>
        <Flex sx={{ gap: '5px', flexDirection: 'column', width: '50%' }}>
          <FieldLabel>{t('order_name', 'Order name')}</FieldLabel>
          <Text>{orderName}</Text>
        </Flex>
        <Flex sx={{ gap: '5px', flexDirection: 'column', width: '50%' }}>
          <FieldLabel>{t('date_created', 'Date Created')}</FieldLabel>
          <Text>{format(new Date(dateCreated), 'MM/dd/yyyy')}</Text>
        </Flex>
      </Flex>

      <Flex sx={{ gap: '5px', flexDirection: 'column' }}>
        <FieldLabel>{t('order_budget', 'Order budget')}</FieldLabel>
        <Text>${budget}</Text>
      </Flex>

      <Flex sx={{ gap: '5px', flexDirection: 'column' }}>
        <FieldLabel>{t('included_datasets', 'Included datasets')}</FieldLabel>
        <Text>[{includedDatasets.join(', ')}]</Text>
      </Flex>

      <Flex sx={{ gap: '5px', flexDirection: 'column' }}>
        <FieldLabel>{t('included_countries', 'Included countries')}</FieldLabel>
        <Text>[{includedCountries.join(', ')}]</Text>
      </Flex>

      <Flex sx={{ gap: '5px', justifyContent: 'flex-end' }}>
        <Button variant="secondary">{t('edit_order', 'Edit order')}</Button>
        <Button>{t('delete_order', 'Delete order')}</Button>
      </Flex>
    </Flex>
  );
};
