import * as ReactQuery from 'react-query';
import { getBaseUrl } from '@utils/constants';
import axios from 'axios';
import { API_ROUTES } from '@data/routes';
import { BuyOrder } from '@data/models/BuyOrder.model';
import { useCountries } from '@store/countries';

export const GET_BUY_ORDER_KEY = '@buy-order/get';

export function useGetBuyOrder(buyOrderId: number): {
  buyOrder: BuyOrder;
  isLoading: boolean;
  isError: boolean;
  refetch: <TPageData>(options?: ReactQuery.RefetchOptions & ReactQuery.RefetchQueryFilters<TPageData>) =>
    Promise<ReactQuery.QueryObserverResult<BuyOrder>>
} {
  const { countries, selectedCountries } = useCountries();

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = ReactQuery.useQuery([GET_BUY_ORDER_KEY], () =>
      axios.get(`${getBaseUrl()}/${API_ROUTES.BUY_ORDERS}/${buyOrderId}`).then((res) => res.data),
    { enabled: countries?.length > 0 }
  );

  return {
    buyOrder: data,
    isLoading,
    isError,
    refetch,
  }
}
