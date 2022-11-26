import React, { FC } from 'react';
import { Flex } from 'theme-ui';
import Pill from '@components/atoms/Pill/Pill';
import { CountryState, useCountries } from '@store/countries';
import { theme } from '@styles/theme';

export const IncludedCountries: FC = () => {
  const { countries, setCountries } = useCountries();

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
        {countries.map((country: CountryState) => (
          <Pill
            key={country.countryCode}
            title={country.name}
            onClick={() => setCountries(
              countries.map((c: CountryState) => c.countryCode === country.countryCode
                ? { ...c, selected: !c.selected }
                : c
              ))
            }
            sx={{
              background: country.selected ? theme.colors?.secondary : theme.colors?.cardBackground,
              opacity: country.selected ? 1 : 0.3,
              border: `2px solid ${theme.colors?.cardBackground}`,
              borderRadius: '50px',
            }}
          />
        ))}
      </Flex>
    </Flex>
  );
};
