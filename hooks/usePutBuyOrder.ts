import * as ReactQuery from 'react-query';
import { getBaseUrl } from '@utils/constants';
import axios from 'axios';
import { API_ROUTES } from '@data/routes';
import { BuyOrder } from '@data/models/BuyOrder.model';

export const PUT_BUY_ORDER_KEY = '@buy-order/put';

export function usePutBuyOrder() {
  const {
    mutate,
  } = ReactQuery.useMutation([PUT_BUY_ORDER_KEY], ({ id, payload }: { id: number, payload: BuyOrder }) =>
    axios.put(`${getBaseUrl()}/${API_ROUTES.BUY_ORDERS}/${id}`, payload).then((res) => res.data),
    {
      onError: () => alert('Error updating order'),
      onSuccess: () => alert('Updated successfully'),
    }
  );

  return {
    putBuyOrder: mutate,
  }
}
