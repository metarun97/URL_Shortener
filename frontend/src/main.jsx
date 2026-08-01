import { createRoot } from 'react-dom/client';
import './index.css';
import { ToastContainer } from 'react-toastify';
import App from './RootLayout.jsx';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from './routes/routeTree.js';
import { Provider } from 'react-redux';
import { store } from './store/store';

const router = createRouter({ routeTree });

createRoot(document.getElementById('root')).render(
  <>
    <Provider store={store}>
      <ToastContainer />
      <RouterProvider router={router} />
    </Provider>
  </>,
);
