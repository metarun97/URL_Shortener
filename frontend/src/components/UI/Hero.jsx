import { Link } from '@tanstack/react-router';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-slate-950 via-slate-900 to-indigo-950">
      {/* Background Blur */}
      <div className="absolute -top-32 left-0 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl"></div>

      <div className="mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center justify-center px-6 py-20 text-center">
        {/* Badge */}
        <span className="mb-6 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm font-medium text-indigo-300">
          🚀 Fast • Secure • Free URL Shortener
        </span>

        {/* Heading */}
        <h1 className="max-w-4xl text-5xl font-extrabold leading-tight tracking-tight text-white md:text-7xl">
          Shorten, Manage &
          <span className="block bg-linear-to-r from-indigo-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Track Every Link
          </span>
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          Sign in to create secure short links, monitor click analytics,
          organize your URLs, and access them from anywhere.
        </p>

        {/* CTA Buttons */}

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            to="/login"
            className="rounded-xl bg-indigo-600 px-8 py-4 text-center font-semibold text-white transition hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30"
          >
            Login to Shorten URLs
          </Link>

          <Link
            to="/register"
            className="rounded-xl border border-slate-700 bg-slate-900/50 px-8 py-4 text-center font-semibold text-slate-200 transition hover:border-indigo-500 hover:bg-slate-800"
          >
            Create Free Account
          </Link>
        </div>

        {/* Preview Card */}
        <div className="mt-16 w-full max-w-3xl rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl backdrop-blur">
          <p className="mb-5 text-sm uppercase tracking-widest text-indigo-400">
            Dashboard Preview
          </p>

          <div className="space-y-4">
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <p className="truncate text-sm text-slate-500">
                https://www.example.com/very-long-product-page
              </p>

              <div className="mt-3 flex items-center justify-between">
                <span className="font-medium text-cyan-400">
                  short.ly/aBc123
                </span>

                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                  248 Clicks
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <p className="truncate text-sm text-slate-500">
                https://github.com/example/project
              </p>

              <div className="mt-3 flex items-center justify-between">
                <span className="font-medium text-cyan-400">
                  short.ly/xYz789
                </span>

                <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-400">
                  Analytics Enabled
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid w-full max-w-4xl grid-cols-2 gap-6 md:grid-cols-4">
          <div>
            <h2 className="text-3xl font-bold text-white">1M+</h2>
            <p className="mt-1 text-slate-400">Links Created</p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-white">500K+</h2>
            <p className="mt-1 text-slate-400">Users</p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-white">99.9%</h2>
            <p className="mt-1 text-slate-400">Uptime</p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-white">24/7</h2>
            <p className="mt-1 text-slate-400">Available</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
