import React, { FC } from 'react';
import { Spinner } from 'theme-ui';
import { Flex } from '@components/atoms';

export const Loader: FC = () => {
  return (
    <Flex
      sx={{
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Spinner />
    </Flex>
  );
};
