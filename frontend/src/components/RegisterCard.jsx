import { useForm } from 'react-hook-form';
import { registerUser } from '../apis/createUser.api.js';
import { toast } from 'react-toastify';
import { Link } from '@tanstack/react-router';

const RegisterCard = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm();

  /* Login handler */
  const registerHandler = async (data) => {
    try {
      const { name, email, password } = data;
      const { user } = await registerUser(name, email, password);
      toast.success('User registered successfully✅');
      reset();
    } catch (error) {
      setError('root.serverError', {
        type: 'server',
        message: error.response?.data?.message || 'Register failed',
      });
    }
  };

  return (
    <div
      onSubmit={handleSubmit(registerHandler)}
      className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-2xl backdrop-blur-xl"
    >
      <h2 className="mb-8 text-center text-3xl font-bold text-white">Login</h2>

      <form className="space-y-5">
        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Name
          </label>

          <div className="flex items-center rounded-xl border border-slate-700 bg-slate-950 px-4 focus-within:border-indigo-500">
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full bg-transparent px-3 py-3 text-white placeholder:text-slate-500 outline-none"
              {...register('name', {
                required: 'Name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters',
                },
              })}
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Email
          </label>

          <div className="flex items-center rounded-xl border border-slate-700 bg-slate-950 px-4 focus-within:border-indigo-500">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-transparent px-3 py-3 text-white placeholder:text-slate-500 outline-none"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Please enter a valid email',
                },
              })}
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-medium text-slate-300">
              Password
            </label>
          </div>

          <div className="flex items-center rounded-xl border border-slate-700 bg-slate-950 px-4 focus-within:border-indigo-500">
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full bg-transparent px-3 py-3 text-white placeholder:text-slate-500 outline-none"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
            />
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 py-3 font-semibold text-white transition hover:scale-[1.02] hover:shadow-lg hover:shadow-indigo-500/30"
        >
          Login
        </button>
      </form>

      {/* Divider */}
      <div className="my-8 flex items-center">
        <div className="h-px flex-1 bg-slate-700"></div>
        <span className="px-4 text-sm text-slate-500">OR</span>
        <div className="h-px flex-1 bg-slate-700"></div>
      </div>

      {/* Register */}
      <p className="text-center text-slate-400">
        Already have an account?
        <Link
          to="/login"
          className="font-semibold text-indigo-400 hover:text-indigo-300"
        >
          Login now
        </Link>
      </p>
    </div>
  );
};

export default RegisterCard;
