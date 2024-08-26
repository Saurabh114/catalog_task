import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {

  return (
    <>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px 40px",
          borderBottom: "1px solid #EAEAEA",
        }}
      >
        <ul style={{ display: "flex", listStyle: "none", padding: 0 }}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              ` ${
                isActive ? "bg-gray-900 text-white" : " text-black"
              } text-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 mx-2 text-base font-semibold`
            }
          >
            Figma Graph
          </NavLink>
          <NavLink
            to="tradingview"
            className={({ isActive }) =>
              ` ${
                isActive ? "bg-gray-900 text-white" : " text-black"
              } text-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 mx-2 text-base font-semibold`
            }
          >
            Trading View Graph
          </NavLink>
        </ul>
      </nav>
      
    </>
  );
};

export default Navbar;
