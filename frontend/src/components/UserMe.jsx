import React from 'react';
import { useSelector } from 'react-redux';

const UserMe = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Cover */}
      <div className="h-24 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

      {/* Profile */}
      <div className="relative px-6 pb-6">
        {/* Avatar */}
        <div className="-mt-12 mb-4">
          <img
            src={user?.data?.avatar}
            alt={user?.data?.name}
            className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-md"
          />
        </div>

        {/* User Info */}
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-gray-900">{user?.data?.name}</h2>

            <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
              Active
            </span>
          </div>

          <p className="mt-1 text-sm text-gray-500">{user?.data?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default UserMe;
