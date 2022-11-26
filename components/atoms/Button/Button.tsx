import React from 'react';
import * as ThemeUI from 'theme-ui';
import { Spinner } from 'theme-ui';
import { theme } from '@styles/theme';

export type ButtonProps = ThemeUI.ButtonProps & {
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  as,
  type = 'button',
  variant = 'primary',
  sx,
  disabled,
  loading,
  children,
  ...props
}, ref) => (
  <ThemeUI.Button
    ref={ref}
    as={as || 'button'}
    type={type}
    variant={variant}
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: disabled || loading ? 'not-allowed' : 'pointer',
      ...sx,
    }}
    disabled={disabled || loading}
    {...props}
  >
    {loading ? <Spinner size={24} color={theme.colors?.background} /> : children}
  </ThemeUI.Button>
));

Button.displayName = 'Button';
