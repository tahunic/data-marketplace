import * as ReactQuery from 'react-query';
import { getBaseUrl } from '@utils/constants';
import axios from 'axios';
import { API_ROUTES, ROUTES } from '@data/routes';
import { useRouter } from 'next/router';

export const DELETE_BUY_ORDER_KEY = '@buy-order/delete';

export function useDeleteBuyOrder() {
  const { push } = useRouter();
  const {
    mutate,
  } = ReactQuery.useMutation([DELETE_BUY_ORDER_KEY], ({ id }: { id: string }) =>
      axios.delete(`${getBaseUrl()}/${API_ROUTES.BUY_ORDERS}/${id}`).then((res) => res.data),
    {
      onError: () => alert('Error deleting order'),
      onSuccess: () => {
        push(ROUTES.BUY_ORDERS);
        alert('Deleted successfully');
      },
    }
  );

  return {
    deleteBuyOrder: mutate,
  }
}
