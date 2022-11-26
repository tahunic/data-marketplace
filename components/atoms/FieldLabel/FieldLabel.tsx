import React, { FC, ReactNode } from 'react';
import { Text, TextProps } from 'theme-ui';
import { theme } from '@styles/theme';

type FieldLabelProps = TextProps & {
  children: ReactNode;
}

export const FieldLabel: FC<FieldLabelProps> = ({
  children,
  ...props
}) => {
  return (
    <Text
      as="p"
      sx={{
        color: theme.colors?.secondaryText,
        textDecoration: 'underline',
      }}
      {...props}
    >
      {children}
    </Text>
  );
};
