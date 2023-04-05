import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Checkout from './components/Checkout/Checkout';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Inventory from './components/Inventory/Inventory';
import Home from './components/Layout/Home';
import Login from './components/Login/Login';
import Order from './components/Order/Order';
import Shop from './components/Shop/Shop';
import './index.css';
import cartProductsLoader from './loaders/cartProductsLoader';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Shop />,
      },
      {
        path: '/order',
        element: <Order />,
        loader: cartProductsLoader,
      },
      {
        path: '/checkout',
        element: <Checkout />,
      },
      {
        path: '/inventory',
        element: <Inventory />,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
