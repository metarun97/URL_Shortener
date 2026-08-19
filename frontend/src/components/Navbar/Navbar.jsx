import { Link, useNavigate } from '@tanstack/react-router';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../apis/authUser.api.js';
import { logout } from '../../store/slice/authSlice.js';
import { toast } from 'react-toastify';
import NavLinks from './NavLinks.jsx';
import NavProfile from './NavProfile.jsx';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* Logout user handler */
  const handleLogout = async () => {
    await logoutUser();
    dispatch(logout());
    toast.success('User logout successfully✅', { autoClose: 900 });
    navigate({ to: '/login' });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Left side Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-tight text-white"
        >
          URL
          <span className="bg-linear-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Shortner
          </span>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-6">
          {/* Navigation Links */}
          {user && <NavLinks />}

          {/* Profile */}
          {user && <NavProfile />}

          {/* Logout */}
          {user && (
            <button
              onClick={handleLogout}
              className="rounded-xl bg-linear-to-r from-red-500 to-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:scale-105 hover:shadow-lg hover:shadow-red-500/30 cursor-pointer"
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
