import { Outlet } from '@tanstack/react-router';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer';
import { Suspense } from 'react';
import Spinner from './components/Spinner';

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Suspense fallback={<Spinner />}>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  );
};

export default RootLayout;
