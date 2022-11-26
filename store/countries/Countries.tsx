import React from 'react';
import { createStoreProvider } from '@utils/context/createStoreProvider';
import { Country } from '@data/models/Country.model';

export type CountryState = Country & {
  selected: boolean;
}

function useCountriesState(): any {
  const [countries, setCountries] = React.useState<CountryState[]>([]);

  return {
    countries,
    setCountries,
  };
}

export const [useCountries, CountriesProvider] = createStoreProvider(useCountriesState);
