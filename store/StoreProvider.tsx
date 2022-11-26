import React, { FC, ReactNode } from 'react';
import { CountriesProvider } from './countries';

type StoreProviderProps = {
  children: ReactNode;
}

const StoreProvider: FC<StoreProviderProps> = ({ children }) => {
  return (
    <CountriesProvider>
      {children}
    </CountriesProvider>
  );
};

export default StoreProvider;