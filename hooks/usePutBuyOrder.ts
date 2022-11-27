import * as ReactQuery from 'react-query';
import { getBaseUrl } from '@utils/constants';
import axios from 'axios';
import { API_ROUTES, ROUTES } from '@data/routes';
import { BuyOrder } from '@data/models/BuyOrder.model';
import toast from 'react-hot-toast';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

export const PUT_BUY_ORDER_KEY = '@buy-order/put';

export function usePutBuyOrder() {
  const { push } = useRouter();
  const { t } = useTranslation();
  const {
    mutate,
  } = ReactQuery.useMutation([PUT_BUY_ORDER_KEY], ({ id, payload }: { id: number, payload: BuyOrder }) =>
    axios.put(`${getBaseUrl()}/${API_ROUTES.BUY_ORDERS}/${id}`, payload).then((res) => res.data),
    {
      onError: () => {
        toast.error(t('put_order_error', 'Could not update the order'))
      },
      onSuccess: () => {
        push(ROUTES.BUY_ORDERS);
        toast.success(t('put_order_success', 'Buy order has been updated'));
      },
    }
  );

  return {
    putBuyOrder: mutate,
  }
}
