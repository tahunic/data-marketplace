import * as ReactQuery from 'react-query';
import { getBaseUrl } from '@utils/constants';
import axios from 'axios';
import { API_ROUTES } from '@data/routes';
import { BuyOrder } from '@data/models/BuyOrder.model';

export const GET_BUY_ORDER_KEY = '@buy-order/get';

export function useGetBuyOrder(buyOrderId: string): {
  buyOrder: BuyOrder | null;
  isLoading: boolean;
  isError: boolean;
} {
  const {
    data,
    isLoading,
    isError,
  } = ReactQuery.useQuery([GET_BUY_ORDER_KEY, { buyOrderId }], () => {
      if (buyOrderId !== 'create') {
        return axios.get(`${getBaseUrl()}/${API_ROUTES.BUY_ORDERS}/${buyOrderId}`).then((res) => res.data)
      } else {
        return {
          buyOrder: null,
          isLoading: false,
          isError: false,
        }
      }
    }
  );

  return {
    buyOrder: data,
    isLoading,
    isError,
  }
}
