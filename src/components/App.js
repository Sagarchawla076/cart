import React, { useReducer } from "react";
import "../styles/main.scss";
import Navbar from "./Navbar";
import Cart from "./Cart";

const App = () => {
  return (
    <>
      <Navbar />
      <Cart />
    </>
  );
};
export default App;
