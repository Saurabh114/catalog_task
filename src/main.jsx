// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from "react-router-dom";

import App from './App.jsx'
import TradingViewWidget from "./components/TradingView/TradingView";
import Dashboard from "./components/Dashboard/Dashboard";
import './index.css'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Dashboard />} />
      <Route path="tradingview" element={<TradingViewWidget />} />
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router={router} />
  </>,
)
