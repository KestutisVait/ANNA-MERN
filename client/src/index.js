import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Landing from './pages/Landing';
import Login from './pages/Login';
import AdminDash from './pages/admin_dash/AdminDash';
import AdminWellcome from './pages/admin_dash/outlets/AdminWellcome';
import Navigation from './pages/admin_dash/outlets/Navigation';
import Carousel from './pages/admin_dash/outlets/Slides';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index element={<Landing />} />
      </Route>
      <Route path="/admin" element={<AdminDash />}>
        <Route index element={<AdminWellcome />} />
        <Route path="/admin/nav" element={<Navigation />} />
        <Route path="/admin/carousel" element={<Carousel />} />
      </Route>
    </>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

