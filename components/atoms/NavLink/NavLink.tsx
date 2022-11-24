import React, { FC, ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface NavLinkProps {
  to: string;
  children?: ReactNode;
}

export const NavLink: FC<NavLinkProps> = ({ to, children, ...props }) => {
  const router = useRouter();

  return (
    <Link
      href={to}
      className="nav-link"
      style={{ fontWeight: router.pathname?.startsWith(to) ? '400' : '200' }}
      {...props}
    >{children}</Link>
  );
};
