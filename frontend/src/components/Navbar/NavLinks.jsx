import React from 'react';
import { Link } from '@tanstack/react-router';

const NavLinks = () => {
  return (
    <nav className="hidden items-center gap-6 md:flex">
      <Link
        to="/"
        className="text-sm font-medium text-slate-300 transition hover:text-indigo-400"
        activeProps={{
          className: 'text-indigo-400',
        }}
      >
        Home
      </Link>

      <Link
        to="/dashboard"
        className="text-sm font-medium text-slate-300 transition hover:text-indigo-400"
        activeProps={{
          className: 'text-indigo-400',
        }}
      >
        Dashboard
      </Link>
    </nav>
  );
};

export default NavLinks;
