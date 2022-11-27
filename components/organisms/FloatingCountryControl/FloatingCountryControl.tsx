import React, { FC } from 'react';
import { Flex } from '@components/atoms';
import { CountryControl, CountryControlProps } from '@components/molecules';
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
        gap="10px"
        p="20px"
        sx={{
          border: `2px solid ${theme.colors?.secondaryText}`,
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
