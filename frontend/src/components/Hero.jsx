const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
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
          Make Your Links
          <span className="block bg-gradient-to-r from-indigo-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Short, Smart & Shareable
          </span>
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          Transform long and messy URLs into clean, memorable links in
          seconds. Track clicks, manage your links, and share them anywhere.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <button className="rounded-xl bg-indigo-600 px-8 py-4 font-semibold text-white transition hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30">
            Shorten URL
          </button>

          <button className="rounded-xl border border-slate-700 bg-slate-900/50 px-8 py-4 font-semibold text-slate-200 transition hover:border-indigo-500 hover:bg-slate-800">
            Learn More
          </button>
        </div>

        {/* Preview Card */}
        <div className="mt-16 w-full max-w-3xl rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl backdrop-blur">
          <div className="flex flex-col gap-4 md:flex-row">
            <input
              type="text"
              placeholder="https://www.example.com/very-long-url..."
              className="flex-1 rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-indigo-500"
            />

            <button className="rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-500 px-6 py-3 font-semibold text-white transition hover:scale-105">
              Create Short URL
            </button>
          </div>

          <div className="mt-6 rounded-lg border border-slate-800 bg-slate-950 p-4">
            <p className="text-sm text-slate-400">Example</p>

            <div className="mt-2 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <span className="truncate text-slate-500">
                https://www.example.com/very-long-url-with-many-parameters
              </span>

              <span className="font-medium text-cyan-400">
                short.ly/aBc123
              </span>
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
