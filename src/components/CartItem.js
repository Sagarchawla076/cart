import React from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { useGlobalContext } from "./context/Context";
const CartItem = ({ id, title, price, img, amount, i }) => {
  const { removeItem, toggleAmount } = useGlobalContext();

  return (
    <div className="item" key={id}>
      <div className="item__info">
        <div className="item__info--img">
          <img src={img} alt="" />
        </div>
        <div className="item__info--details">
          <div className="company">
            <p className="company--name">{title}</p>
            <div className="company--price">${price}</div>
          </div>
          <button className="remove" onClick={() => removeItem(id)}>
            remove
          </button>
        </div>
      </div>
      <div className="item__amount">
        <IoIosArrowUp onClick={() => toggleAmount(id, "INC__AMOUNT")} />
        <p className="amount">{amount}</p>
        <IoIosArrowDown onClick={() => toggleAmount(id, "DEC__AMOUNT")} />
      </div>
    </div>
  );
};
export default CartItem;
