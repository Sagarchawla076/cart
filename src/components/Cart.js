import React from "react";
import CartItem from "./CartItem";

import { useGlobalContext } from "./context/Context";

const Cart = () => {
  const { total, cart, clearCart, loading } = useGlobalContext(); //, clearData
  const renderList = () => {
    return cart.map((item, i) => {
      return <CartItem key={item.id} {...item} i={i} />;
    });
  };
  console.log(loading);
  if (loading) {
    return <h1 className="ui text loader active ">Loading....</h1>;
  } else {
    return (
      <section className="cart">
        <div className="cart__header">
          <h2>your bag</h2>
        </div>
        <div className="cart__list">{renderList()}</div>
        {cart.length !== 0 ? (
          <div className="cart__total">
            <span>Total</span>
            <span className="total">${total}</span>
          </div>
        ) : (
          <span className="empty"> is currently Empty</span>
        )}
        {cart.length !== 0 ? (
          <button className="cart__clear" onClick={() => clearCart()}>
            clear cart
          </button>
        ) : null}
      </section>
    );
  }
};
export default Cart;
