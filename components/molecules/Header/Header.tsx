import React, { FC } from 'react';
import { Flex } from 'theme-ui';
import { useTranslation } from 'next-i18next';
import { NavLink } from '@components/atoms/NavLink';
import { ROUTES } from '@data/routes';
import { theme } from '@styles/theme';

export const Header: FC = () => {
  let { t } = useTranslation();
  return (
    <Flex sx={{ background: theme.colors?.headerBackground }}>
      <NavLink to={ROUTES.BUY_ORDERS}>{t('buy_orders', 'Buy Orders')}</NavLink>
      <NavLink to={ROUTES.DATASETS}>{t('datasets', 'Datasets')}</NavLink>
    </Flex>
  );
};
