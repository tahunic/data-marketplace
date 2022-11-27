import React from 'react';
import { createStoreProvider } from '@utils/context/createStoreProvider';
import { Country } from '@data/models/Country.model';

export type CountrySelectable = Country & {
  selected: boolean;
}

function useCountriesState(): {
  countries: CountrySelectable[],
  selectedCountries: CountrySelectable[];
  setCountries: (countries: CountrySelectable[]) => void,
} {
  const [countries, setCountries] = React.useState<CountrySelectable[]>([]);

  return {
    countries,
    selectedCountries: countries.filter((country: CountrySelectable) => country.selected),
    setCountries,
  };
}

export const [useCountries, CountriesProvider] = createStoreProvider(useCountriesState);
