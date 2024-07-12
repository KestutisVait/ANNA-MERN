import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Landing from './pages/Landing';
import Login from './pages/Login';
import AdminDash from './pages/admin_dash/AdminDash';
import Admins from './pages/admin_dash/outlets/admins/Admins';
import Navigation from './pages/admin_dash/outlets/Navigation';
import Carousel from './pages/admin_dash/outlets/slides/Slides';
import Articles from './pages/admin_dash/outlets/articles/Articles';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import { AuthContextProvider } from './Context';


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index element={<Landing />} />
      </Route>
      <Route path="/admin" element={<AdminDash />}>
        <Route index element={<Admins />} />
        <Route path="/admin/nav" element={<Navigation />} />
        <Route path="/admin/carousel" element={<Carousel />} />
        <Route path="/admin/article" element={<Articles />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <RouterProvider router={router} />
  </AuthContextProvider>
);

