import React, { useState } from 'react';
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom"

function App() {
 

  return (
    <div className="container mx-auto">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
