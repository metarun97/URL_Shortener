/* Impoted items */
import { createRoot } from 'react-dom/client';
import './index.css';
import { ToastContainer } from 'react-toastify';
import App from './RootLayout.jsx';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from './routes/routeTree.routes.js';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

/* queryclient created here */
const queryClient = new QueryClient();

/* Router initiated here */
const router = createRouter({
  routeTree,
  context: {
    queryClient,
    store,
  },
});

/* Root element created here */
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </Provider>,
);
