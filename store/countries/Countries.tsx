import React from 'react';
import { createStoreProvider } from '@utils/context/createStoreProvider';
import { Country } from '@data/models/Country.model';

export type CountryState = Country & {
  selected: boolean;
}

function useCountriesState(): {
  countries: CountryState[],
  selectedCountries: CountryState[];
  setCountries: (countries: CountryState[]) => void,
} {
  const [countries, setCountries] = React.useState<CountryState[]>([]);

  return {
    countries,
    selectedCountries: countries.filter((country: CountryState) => country.selected),
    setCountries,
  };
}

export const [useCountries, CountriesProvider] = createStoreProvider(useCountriesState);
