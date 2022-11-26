import React, { FC } from 'react';
import { Flex } from 'theme-ui';
import Pill from '@components/atoms/Pill/Pill';
import { CountryState, useCountries } from '@store/countries';
import { theme } from '@styles/theme';

export const IncludedCountries: FC = () => {
  let { countries, setCountries } = useCountries();
  return (
    <Flex
      sx={{
        gap: '10px',
      }}
    >
      {countries.map((country: CountryState) => (
        <Pill
          key={country.countryCode}
          title={country.name}
          onClick={() =>
            setCountries(
              countries.map((c: CountryState) => c.countryCode === country.countryCode
                ? { ...c, selected: !c.selected }
                : c
              ))
          }
          sx={{
            background: country.selected ? theme.colors?.cardBackground : theme.colors?.muted
          }}
        />
      ))}
    </Flex>
  );
};
