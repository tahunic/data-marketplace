import React, { FC } from 'react';
import { CountryState } from '@store/countries';
import { theme } from '@styles/theme';
import { Pill } from '@components/atoms/Pill';

export type IncludedCountriesProps = {
  countries: CountryState[];
  onSetCountries?: ((country: CountryState) => void);
}

export const IncludedCountries: FC<IncludedCountriesProps> = ({
  countries,
  onSetCountries,
}) => {
  return (
    <>
      {countries.map((country: CountryState) => (
        <Pill
          key={country.countryCode}
          title={country.name}
          onClick={() => onSetCountries && onSetCountries(country)}
          py={0}
          sx={{
            background: country.selected ? theme.colors?.secondary : theme.colors?.cardBackground,
            opacity: country.selected ? 1 : 0.3,
            border: `2px solid ${theme.colors?.cardBackground}`,
            borderRadius: '50px',
          }}
        />
      ))}
    </>
  );
};
