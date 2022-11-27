import React, { FC, ReactNode } from 'react';
import Link from 'next/link';

interface NavLinkProps {
  to: string;
  active?: boolean;
  children?: ReactNode;
}

export const NavLink: FC<NavLinkProps> = ({
  to,
  active,
  children,
  ...props
}) => (
  <Link
    href={to}
    className="nav-link"
    style={{ fontWeight: active ? '400' : '200' }}
    {...props}
  >
    {children}
  </Link>
);
