import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from '@tanstack/react-router';
import { loginUser } from '../../apis/authUser.api';
import { login } from '../../store/slice/authSlice';

const LoginCard = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm();

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* Login handler */
  const loginHandler = async (data) => {
    try {
      const { email, password } = data;
      const loginData = await loginUser(email, password);
      const user = loginData?.user || loginData;
      dispatch(login(user));
      toast.success('User loggedIn successfully✅');
      reset();
      navigate({
        to: '/dashboard',
        replace: true,
      });
      c;
    } catch (error) {
      setError('serverError', {
        type: 'server',
        message: error?.message,
      });
    }
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-2xl backdrop-blur-xl">
      <h2 className="mb-8 text-center text-3xl font-bold text-white">Login</h2>

      <form onSubmit={handleSubmit(loginHandler)} className="space-y-5">
        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Email
          </label>

          <div className="flex items-center rounded-xl border bg-slate-950 px-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-transparent px-3 py-3 text-white placeholder:text-slate-500 outline-none"
              {...register('email', {
                required: 'Email is required',
              })}
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Password
          </label>

          <div className="flex items-center rounded-xl border bg-slate-950 px-4 ">
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full bg-transparent px-3 py-3 text-white placeholder:text-slate-500 outline-none"
              {...register('password', {
                required: 'Password is required',
              })}
            />
          </div>
        </div>

        {/* COMMON ERROR SECTION */}
        {errors?.serverError?.message && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
            {errors?.serverError?.message}
          </div>
        )}

        <button
          type="submit"
          className="w-full rounded-xl bg-linear-to-r from-indigo-600 to-cyan-500 py-3 font-semibold text-white"
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
        Don't have an account?
        <Link
          to="/register"
          className="font-semibold text-indigo-400 hover:text-indigo-300"
        >
          Create Account
        </Link>
      </p>
    </div>
  );
};

export default LoginCard;
