import React, { FC, ReactNode, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { Toaster } from 'react-hot-toast';
import { Loader } from '@components/atoms';
import { Header } from '@components/molecules';
import { useGetCountries } from '@hooks/useGetCountries';
import { useCountries } from '@store/countries';
import { Country } from '@data/models';

type LayoutProps = {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  const { countries, isLoading, isError } = useGetCountries();
  const { setCountries } = useCountries();
  const { t } = useTranslation();

  useEffect(() => {
    if (countries && !isLoading && !isError) {
      setCountries(countries.map((country: Country) => ({ ...country, selected: true })));
    }
  }, [countries, setCountries, isLoading, isError]);

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <h3>{t('countries_could_not_be_fetched', 'Countries could not be fetched')}</h3>
  }

  return (
    <>
      <Header />
      <main>{children}</main>
      <Toaster />
    </>
  );
};
