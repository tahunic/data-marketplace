import * as ReactQuery from 'react-query';
import { getBaseUrl } from '@utils/constants';
import axios from 'axios';
import { API_ROUTES, ROUTES } from '@data/routes';
import { BuyOrder } from '@data/models/BuyOrder.model';
import { useRouter } from 'next/router';

export const POST_BUY_ORDER_KEY = '@buy-order/post';

export function usePostBuyOrder() {
  const { push } = useRouter();
  const {
    mutate,
  } = ReactQuery.useMutation([POST_BUY_ORDER_KEY], ({ payload }: { payload: BuyOrder }) =>
      axios.post(`${getBaseUrl()}/${API_ROUTES.BUY_ORDERS}`, payload).then((res) => res.data),
    {
      onError: () => alert('Error updating order'),
      onSuccess: () => {
        push(ROUTES.BUY_ORDERS);
        alert('Added successfully');
      },
    }
  );

  return {
    postBuyOrder: mutate,
  }
}
