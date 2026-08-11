import { useForm } from 'react-hook-form';
import { loginUser } from '../apis/createUser.api.js';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/slice/authSlice.js';
import { Link, useNavigate } from '@tanstack/react-router';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm();

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(auth);

  /* Login handler */
  const loginHandler = async (data) => {
    try {
      const { email, password } = data;
      const loginData = await loginUser(email, password);
      const user = loginData?.user || loginData;
      dispatch(login(user));
      navigate({ to: '/dashboard', replace: true });
      toast.success('User loggedIn successfully✅');
      reset();
    } catch (error) {
      setError('root.serverError', {
        type: 'server',
        message: error.response?.data?.message || 'Login failed',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Welcome Back
        </h1>

        <p className="text-gray-500 text-center mt-2">Login to continue</p>

        <form onSubmit={handleSubmit(loginHandler)} className="mt-8 space-y-5">
          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Please enter a valid email',
                },
              })}
              className={`w-full rounded-lg border px-4 py-3 outline-none transition
      ${
        errors.email
          ? 'border-red-500 focus:ring-red-200'
          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
      }`}
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              className={`w-full rounded-lg border px-4 py-3 outline-none transition
      ${
        errors.password
          ? 'border-red-500 focus:ring-red-200'
          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
      }`}
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Register */}
        <p className="text-center text-gray-600 mt-6">
          Don't have an account?
          <Link
            to="/register"
            type="button"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;




