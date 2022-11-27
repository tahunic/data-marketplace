import React, { FC } from 'react';
import { Text } from 'theme-ui';
import { useTranslation } from 'next-i18next';
import { useCountries } from '@store/countries';
import { Flex } from '@components/atoms';
import { Country } from '@data/models';

type ShowingResultsFromProps = {
  totalResults: number;
}

export const ShowingResultsFrom: FC<ShowingResultsFromProps> = ({
  totalResults,
}) => {
  const { t } = useTranslation();
  const { selectedCountries } = useCountries();

  if (totalResults === 0 && selectedCountries?.length === 0) {
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
      <Text sx={{ fontWeight: '700' }}>{selectedCountries.map((c: Country) => c.name).join(', ')}</Text>
    </Flex>
  );
};
