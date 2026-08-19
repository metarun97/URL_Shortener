import { Outlet } from '@tanstack/react-router';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/UI/Footer';

const RootLayout = () => {

  return (
    <>
      <Navbar />
        <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;
