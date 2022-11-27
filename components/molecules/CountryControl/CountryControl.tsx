import React, { FC } from 'react';
import { CountrySelectable } from '@store/countries';
import { theme } from '@styles/theme';
import { Pill } from '@components/atoms/Pill';

export type CountryControlProps = {
  countries: CountrySelectable[];
  onSetCountries?: ((country: CountrySelectable) => void);
  readonly?: boolean;
}

export const CountryControl: FC<CountryControlProps> = ({
  countries,
  onSetCountries,
  readonly = false,
}) => {
  return (
    <>
      {countries.map((country: CountrySelectable) => (
        <Pill
          key={country.countryCode}
          title={country.name}
          onClick={() => !readonly && onSetCountries && onSetCountries(country)}
          py={0}
          sx={{
            background: country.selected ? theme.colors?.secondary : theme.colors?.primary,
            opacity: country.selected ? 1 : 0.3,
            border: `2px solid ${theme.colors?.cardBackground}`,
            borderRadius: '50px',
          }}
        />
      ))}
    </>
  );
};
