import React, { FC, ReactNode } from 'react';
import * as ThemeUI from 'theme-ui' ;

type FlexProps = ThemeUI.FlexProps & {
  alignItems?: string;
  justifyContent?: string;
  flexDirection?: 'column' | 'row';
  gap?: string;
  width?: string;
  opacity?: number;
  children?: ReactNode;
}

export const Flex: FC<FlexProps> = ({
  alignItems = 'initial',
  justifyContent = 'initial',
  flexDirection = 'row',
  gap = '5px',
  width = 'auto',
  opacity = 1,
  children,
  sx,
  ...props
}) => (
  <ThemeUI.Flex
    sx={{
      alignItems,
      justifyContent,
      flexDirection,
      gap,
      width,
      opacity,
      ...sx,
    }}
    {...props}
  >
    {children}
  </ThemeUI.Flex>
);
