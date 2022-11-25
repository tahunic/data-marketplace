import React, { FC } from 'react';
import { Flex, Text } from 'theme-ui';
import { useTranslation } from 'next-i18next';

type ShowingResultsFromProps = {
  totalResults: number;
  includedCountries: string[];
}

export const ShowingResultsFrom: FC<ShowingResultsFromProps> = ({
  totalResults,
  includedCountries
}) => {
  const { t } = useTranslation();

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
      <Text sx={{ fontWeight: '700' }}>{includedCountries.join(', ')}</Text>
    </Flex>
  );
};
