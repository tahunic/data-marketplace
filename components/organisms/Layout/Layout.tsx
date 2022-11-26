import React, { FC, ReactNode, useEffect } from 'react';
import { Header } from '@components/molecules/Header';
import { useGetCountries } from '@hooks/useGetCountries';
import { useCountries } from '@store/countries';
import { Country } from '@data/models/Country.model';

type LayoutProps = {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  const { countries, isLoading, isError } = useGetCountries();
  const { setCountries } = useCountries();
  useEffect(() => {
    if (!isLoading && !isError) {
      setCountries(countries.map((country: Country) => ({ ...country, selected: true })));
    }
  }, [countries, setCountries, isLoading, isError]);

  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};
