import React from 'react';
import UserUrls from './../components/UI/UserUrls';
import UrlForm from './../components/UI/UrlForm';

const DashboardPage = () => {
  return (
    <main className="relative overflow-hidden px-4 py-10 md:px-6">
      {/* Blur Effects */}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 top-[45%] h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl">
        {/* URL Form */}
        <div className="mx-auto max-w-3xl">
          <UrlForm />
        </div>

        {/* Space Between Sections */}
        <div className="my-12 flex items-center gap-4">
          <div className="h-px flex-1 bg-slate-800" />

          <span className="rounded-full border border-slate-800 bg-slate-900 px-4 py-2 text-xs font-medium text-slate-500">
            YOUR URL LINKS
          </span>

          <div className="h-px flex-1 bg-slate-800" />
        </div>

        {/* User URLs */}
        <UserUrls />
      </div>
    </main>
  );
};

export default DashboardPage;
