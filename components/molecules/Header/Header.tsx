import React, { FC } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { Flex, NavLink } from '@components/atoms';
import { ROUTES } from '@data/routes';
import { theme } from '@styles/theme';

export const Header: FC = () => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Flex sx={{ background: theme.colors?.headerBackground }}>
      <NavLink
        to={ROUTES.BUY_ORDERS}
        active={router.pathname?.startsWith(ROUTES.BUY_ORDERS)}
      >
        {t('buy_orders', 'Buy Orders')}
      </NavLink>
      <NavLink
        to={ROUTES.DATASETS}
        active={router.pathname?.startsWith(ROUTES.DATASETS)}
      >
        {t('datasets', 'Datasets')}
      </NavLink>
    </Flex>
  );
};
