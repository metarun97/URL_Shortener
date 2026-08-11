import { Outlet } from '@tanstack/react-router';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer/>
    </>
  );
};

export default RootLayout;
