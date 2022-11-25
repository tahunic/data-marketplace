import React, { FC } from 'react';
import { Box, Text } from 'theme-ui';
import { theme } from '@styles/theme';

type PillProps = {
  title: string;
}

const Pill: FC<PillProps> = ({
  title,
}) => {
  return (
    <Box
      sx={{
        backgroundColor: theme.colors?.muted,
        borderRadius: '25px',
        padding: '3px 15px',
      }}
    >
      <Text sx={{ color: theme.colors?.secondaryText }}>{title}</Text>
    </Box>
  );
};

export default Pill;