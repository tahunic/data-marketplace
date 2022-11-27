import * as ReactQuery from 'react-query';
import { getBaseUrl } from '@utils/constants';
import axios from 'axios';
import { API_ROUTES, ROUTES } from '@data/routes';
import { BuyOrder } from '@data/models/BuyOrder.model';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { useTranslation } from 'next-i18next';

export const POST_BUY_ORDER_KEY = '@buy-order/post';

export function usePostBuyOrder() {
  const { push } = useRouter();
  const { t } = useTranslation();
  const {
    mutate,
  } = ReactQuery.useMutation([POST_BUY_ORDER_KEY], ({ payload }: { payload: BuyOrder }) =>
      axios.post(`${getBaseUrl()}/${API_ROUTES.BUY_ORDERS}`, payload).then((res) => res.data),
    {
      onError: () => {
        toast.error(t('post_order_error', 'Could not add the order'));
      },
      onSuccess: () => {
        push(ROUTES.BUY_ORDERS);
        toast.success(t('post_order_success', 'Buy order has been added'));
      },
    }
  );

  return {
    postBuyOrder: mutate,
  }
}
