import React, { FC } from 'react';
import { Text } from 'theme-ui';

type PageHeaderProps = {
  title: string;
}

export const PageHeader: FC<PageHeaderProps> = ({
  title,
}) => {
  return (
    <Text
      as="h1"
      sx={{
        textAlign: 'center',
        margin: '30px 0 20px 0',
      }}
    >
      {title}
    </Text>
  );
};
