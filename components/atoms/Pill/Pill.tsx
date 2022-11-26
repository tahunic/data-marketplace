import React, { FC } from 'react';
import { Box, Text } from 'theme-ui';
import { theme } from '@styles/theme';
import { Button, ButtonProps } from '@components/atoms/Button';

type PillProps = ButtonProps & {
  title: string;
}

const Pill: FC<PillProps> = ({
  title,
  ...props
}) => {
  return (
    <Button
      sx={{
        backgroundColor: theme.colors?.muted,
        borderRadius: '50px',
        padding: '3px 15px',
      }}
      {...props}
    >
      <Text sx={{ color: theme.colors?.secondaryText }}>{title}</Text>
    </Button>
  );
};

export default Pill;