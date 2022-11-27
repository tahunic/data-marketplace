import * as ReactQuery from 'react-query';
import { getBaseUrl } from '@utils/constants';
import axios from 'axios';
import { API_ROUTES, ROUTES } from '@data/routes';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { useTranslation } from 'next-i18next';

export const DELETE_BUY_ORDER_KEY = '@buy-order/delete';

export function useDeleteBuyOrder() {
  const { push } = useRouter();
  const { t } = useTranslation();
  const {
    mutate,
  } = ReactQuery.useMutation([DELETE_BUY_ORDER_KEY], ({ id }: { id: string }) =>
      axios.delete(`${getBaseUrl()}/${API_ROUTES.BUY_ORDERS}/${id}`).then((res) => res.data),
    {
      onError: () => {
        toast.error(t('delete_order_error', 'Could not delete the order'))
      },
      onSuccess: () => {
        push(ROUTES.BUY_ORDERS);
        toast.success(t('delete_order_success', 'Buy order has been deleted'));
      },
    }
  );

  return {
    deleteBuyOrder: mutate,
  }
}
