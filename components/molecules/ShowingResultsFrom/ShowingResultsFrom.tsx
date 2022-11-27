import React, { FC } from 'react';
import { Text } from 'theme-ui';
import { useTranslation } from 'next-i18next';
import { Flex } from '@components/atoms';

type ShowingResultsFromProps = {
  totalResults: number;
  countryNames?: string;
}

export const ShowingResultsFrom: FC<ShowingResultsFromProps> = ({
  totalResults = 0,
  countryNames,
}) => {
  const { t } = useTranslation();

  if (totalResults === 0 && !countryNames) {
    return null;
  }

  return (
    <Flex
      sx={{
        columnGap: '5px',
        marginBottom: '5px',
      }}
    >
      <Text>{t('showing', 'Showing')}{' '}</Text>
      <Text sx={{ fontWeight: '700' }}>{totalResults}{' '}</Text>
      <Text>{t('results_from', 'results from')}{' '}</Text>
      <Text sx={{ fontWeight: '700' }}>{countryNames}</Text>
    </Flex>
  );
};
