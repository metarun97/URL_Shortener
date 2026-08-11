import { Link, useNavigate } from '@tanstack/react-router';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../apis/createUser.api.js';
import { logout } from '../store/slice/authSlice.js';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    dispatch(logout());
    toast.success('User logout successfully✅', { autoClose: 900 });
    navigate({ to: '/login' });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-tight text-white"
        >
          URL
          <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Shortner
          </span>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Profile */}
          {user && (
            <button className="group flex items-center gap-3 rounded-full border border-slate-700 bg-slate-900/70 p-1 pr-4 transition hover:border-indigo-500 hover:bg-slate-800">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-sm font-bold text-white">
                {user?.data?.name.slice(0, 1)}
              </div>

              <div className="hidden text-left md:block">
                <p className="text-sm font-semibold text-white">
                  {user?.data?.name}
                </p>
                <p className="text-xs text-slate-400">{user?.data?.email}</p>
              </div>
            </button>
          )}

          {/* Logout */}
          {user && (
            <button
              onClick={handleLogout}
              className="rounded-xl bg-gradient-to-r from-red-500 to-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:scale-105 hover:shadow-lg hover:shadow-red-500/30"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
