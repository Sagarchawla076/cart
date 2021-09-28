import React from "react";
import { FaShoppingBag } from "react-icons/fa";
import { useGlobalContext } from "./context/Context";
const Navbar = () => {
  const { amount } = useGlobalContext();
  return (
    <nav>
      <div className="nav">
        <div className="nav__logo">
          <h3 className="logo">useReducer</h3>
        </div>
        <div className="nav__icon">
          <FaShoppingBag />
          <p className="nav__icon--amount">{amount}</p>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
