import React from 'react';
import { useSelector } from 'react-redux';

const NavProfile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <button className="group flex items-center gap-3 rounded-full border border-slate-700 bg-slate-900/70 p-1 pr-4 transition hover:border-indigo-500 hover:bg-slate-800">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-r overflow-hidden from-indigo-500 to-cyan-500 text-sm font-bold text-white">
        <img src={user?.data?.avatar} alt={user?.data?.name} className='w-full h-full object-cover' />
      </div>

      <div className="hidden text-left md:block">
        <p className="text-sm font-semibold text-white">{user?.data?.name}</p>
        <p className="text-xs text-slate-400">{user?.data?.email}</p>
      </div>
    </button>
  );
};

export default NavProfile;
