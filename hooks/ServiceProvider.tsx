import React from 'react';
import * as ReactQuery from 'react-query';

const queryClient = new ReactQuery.QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

type ServiceProviderProps = ReactQuery.HydrateProps;

export const ServiceProvider: React.FC<ServiceProviderProps> = ({ children, state }) => (
  <ReactQuery.QueryClientProvider client={queryClient}>
    <ReactQuery.Hydrate state={state}>
      {children}
    </ReactQuery.Hydrate>
  </ReactQuery.QueryClientProvider>
);
