import * as ReactQuery from 'react-query';
import { getBaseUrl } from '@utils/constants';
import axios from 'axios';
import { API_ROUTES } from '@data/routes';
import { BuyOrder } from '@data/models/BuyOrder.model';
import { useCountries } from '@store/countries';
import { Country } from '@data/models/Country.model';

export const GET_BUY_ORDERS_KEY = '@buy-orders/get';

export function useGetBuyOrders(): {
  buyOrders: BuyOrder[];
  isLoading: boolean;
  isError: boolean;
  refetch: <TPageData>(options?: ReactQuery.RefetchOptions & ReactQuery.RefetchQueryFilters<TPageData>) =>
    Promise<ReactQuery.QueryObserverResult<BuyOrder[]>>
} {
  const { countries, selectedCountries } = useCountries();

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = ReactQuery.useQuery([GET_BUY_ORDERS_KEY], () =>
      axios.get(`${getBaseUrl()}/${API_ROUTES.BUY_ORDERS}`).then((res) => res.data),
    { enabled: countries?.length > 0 }
  );

  function isIncludedInCountry(buyOrder: BuyOrder) {
    const selectedCountryCodes = selectedCountries?.map((country: Country) => country.countryCode);
    return buyOrder.countries?.some((countryCode: string) => selectedCountryCodes?.includes(countryCode))
  }

  const buyOrders = data.filter(isIncludedInCountry) ?? [];

  return {
    buyOrders,
    isLoading,
    isError,
    refetch,
  }
}
