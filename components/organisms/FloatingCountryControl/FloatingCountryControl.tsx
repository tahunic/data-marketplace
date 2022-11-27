import React, { FC } from 'react';
import { Flex } from 'theme-ui';
import { CountryControl, CountryControlProps } from '@components/molecules/CountryControl';
import { theme } from '@styles/theme';

export const FloatingCountryControl: FC<CountryControlProps> = ({
  countries,
  onSetCountries,
}) => {
  if (!countries) {
    return null;
  }

  return (
    <Flex
      sx={{
        position: 'fixed',
        justifyContent: 'center',
        left: '32%',
        bottom: '30px',
      }}
    >
      <Flex
        sx={{
          gap: '10px',
          border: `2px solid ${theme.colors?.secondaryText}`,
          padding: '20px',
          background: theme.colors?.primary
        }}
      >
        <CountryControl
          countries={countries}
          onSetCountries={onSetCountries}
        />
      </Flex>
    </Flex>
  );
};
