const UrlSkeleton = () => {
  return (
    <section className="relative min-h-screen rounded-xl overflow-hidden bg-linear-to-br from-slate-950 via-slate-900 to-indigo-950 px-4 py-10 md:px-6">
      <div className="relative mx-auto max-w-7xl">

        {/* Header Skeleton */}
        <div className="mb-8 flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-slate-800 animate-pulse" />

          <div className="space-y-2">
            <div className="h-7 w-40 rounded bg-slate-800 animate-pulse" />
            <div className="h-4 w-64 rounded bg-slate-800 animate-pulse" />
          </div>
        </div>

        {/* Desktop Skeleton */}
        <div className="hidden overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 md:block">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/70">
                  <th className="p-5 text-left">
                    <div className="h-4 w-28 rounded bg-slate-800 animate-pulse" />
                  </th>

                  <th className="p-5 text-center">
                    <div className="mx-auto h-4 w-16 rounded bg-slate-800 animate-pulse" />
                  </th>

                  <th className="p-5 text-center">
                    <div className="mx-auto h-4 w-20 rounded bg-slate-800 animate-pulse" />
                  </th>

                  <th className="p-5 text-left">
                    <div className="h-4 w-24 rounded bg-slate-800 animate-pulse" />
                  </th>
                </tr>
              </thead>

              <tbody>
                {Array.from({ length: 6 }).map((_, index) => (
                  <tr
                    key={index}
                    className="border-b border-slate-800/70"
                  >
                    {/* Original URL */}
                    <td className="p-5">
                      <div className="h-4 w-72 rounded bg-slate-800 animate-pulse" />
                    </td>

                    {/* Clicks */}
                    <td className="p-5">
                      <div className="mx-auto h-9 w-20 rounded-lg bg-slate-800 animate-pulse" />
                    </td>

                    {/* Created */}
                    <td className="p-5">
                      <div className="mx-auto h-4 w-24 rounded bg-slate-800 animate-pulse" />
                    </td>

                    {/* Short URL */}
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="h-4 flex-1 rounded bg-slate-800 animate-pulse" />
                        <div className="h-9 w-20 rounded-lg bg-slate-800 animate-pulse" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Skeleton */}
        <div className="space-y-4 md:hidden">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5"
            >
              {/* Original URL */}
              <div className="mb-5">
                <div className="mb-2 h-3 w-24 rounded bg-slate-800 animate-pulse" />

                <div className="h-4 w-full rounded bg-slate-800 animate-pulse" />
                <div className="mt-2 h-4 w-3/4 rounded bg-slate-800 animate-pulse" />
              </div>

              {/* Stats */}
              <div className="mb-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
                  <div className="mb-2 h-3 w-14 rounded bg-slate-800 animate-pulse" />
                  <div className="h-5 w-8 rounded bg-slate-800 animate-pulse" />
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
                  <div className="mb-2 h-3 w-16 rounded bg-slate-800 animate-pulse" />
                  <div className="h-5 w-20 rounded bg-slate-800 animate-pulse" />
                </div>
              </div>

              {/* Short URL */}
              <div>
                <div className="mb-2 h-3 w-20 rounded bg-slate-800 animate-pulse" />

                <div className="mb-3 h-10 w-full rounded-lg bg-slate-800 animate-pulse" />

                <div className="h-12 w-full rounded-xl bg-slate-800 animate-pulse" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default UrlSkeleton;
