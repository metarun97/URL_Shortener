import { Link } from '@tanstack/react-router';
import RegisterCard from '../components/RegisterCard.jsx';

const RegisterPage = () => {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-6">
      {/* Background Blur */}
      <div className="absolute -top-32 left-0 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl"></div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="mb-10 text-center">
          <Link
            to="/"
            className="inline-block text-5xl font-black tracking-tight"
          >
            <span className="text-white">URL</span>
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Shortener
            </span>
          </Link>

          <p className="mt-4 text-base text-slate-400">
            Shorten, manage, and track your links securely.
          </p>
        </div>

        {/* Card */}
        <RegisterCard />
      </div>
    </section>
  );
};

export default RegisterPage;
