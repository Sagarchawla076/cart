// import React, { useContext, useState, useEffect } from "react";
// import Data from "../Data";

// const AppContext = React.createContext();
// const totalCalc = (data) => {
//   return data.reduce((a, c, i, arr) => {
//     return a + arr[i].price * arr[i].amount;
//   }, 0);
// };
// const totalAmount = (data) => {
//   const newAmount = data.reduce((a, c, i, arr) => {
//     return a + arr[i].amount;
//   }, 0);

//   return newAmount;
// };
// export const AppProvider = ({ children }) => {
//   const [data, setData] = useState(Data);
//   const [total, setTotal] = useState(totalCalc(data));
//   const [amount, setAmount] = useState(totalAmount(data));
//   useEffect(() => {
//     const totalMoney = totalCalc(data);
//     setTotal(totalMoney);
//   }, [data]);

//   useEffect(() => {
//     const amountTotal = totalAmount(data);
//     setAmount(amountTotal);
//   }, [data]);

//   const increaseAmount = (i) => {
//     const arrCopy = data.slice();
//     arrCopy[i].amount += 1;
//     setData(arrCopy);
//   };
//   const decreaseAmount = (i) => {
//     const arrCopy = data.slice();
//     if (data[i].amount === 1) {
//       arrCopy.splice(i, 1);
//     } else {
//       arrCopy[i].amount -= 1;
//     }
//     setData(arrCopy);
//   };
//   const removeItem = (i) => {
//     const arrCopy = data.slice();
//     arrCopy.splice(i, 1);
//     setData(arrCopy);
//   };
//   const clearData = () => {
//     setData([]);
//   };

//   return (
//     <AppContext.Provider
//       value={{
//         name: "sagar",
//         increaseAmount,
//         decreaseAmount,
//         removeItem,
//         data,
//         total,
//         clearData,
//         amount,
//       }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// };

// export const useGlobalContext = () => {
//   return useContext(AppContext);
// };

import React, { useReducer, useEffect, useContext } from "react";
import axios from "axios";
import cartItems from "../Data";
const AppContext = React.createContext();

const initialState = {
  loading: true,
  cart: [],
  total: 0,
  amount: 0,
};

export const AppProvider = ({ children }) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "CLEAR__CART":
        return { ...state, cart: [] };
      case "REMOVE__ITEM":
        const newArray = state.cart.filter(
          (item) => item.id !== action.payload
        );
        return { ...state, cart: newArray };

      case "TOTAL__AMOUNT":
        // const totalNumber = state.cart.reduce((a, c, i, arr) => {
        //   return a + arr[i].amount;
        // }, 0);
        // const totalAmount = state.cart.reduce((a, c, i, arr) => {
        //   return a + arr[i].amount * arr[i].price;
        // }, 0);
        // console.log(totalAmount);
        // return { ...state, amount: totalNumber, total: totalAmount };
        let { total, amount } = state.cart.reduce(
          (cartTotal, cartItem) => {
            const { price, amount } = cartItem;
            cartTotal.amount += amount;
            cartTotal.total += price * amount;
            return cartTotal;
          },
          { total: 0, amount: 0 }
        );
        total = parseFloat(total.toFixed(2));
        return { ...state, total, amount };
      case "SUCCESS":
        return { ...state, cart: action.payload, loading: false };
      // case "ERROR":
      //   return { ...state };
      case "TOGGLE__AMOUNT":
        const cartNew = state.cart
          .map((cartItem) => {
            if (action.payload.id === cartItem.id) {
              if (action.payload.type === "INC__AMOUNT") {
                return { ...cartItem, amount: cartItem.amount + 1 };
              }
              return { ...cartItem, amount: cartItem.amount - 1 };
            }
            return cartItem;
          })
          .filter((item) => item.amount !== 0);
        return { ...state, cart: cartNew };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetch = async () => {
      const URL = "https://course-api.com/react-useReducer-cart-project";
      try {
        const response = await axios.get(URL);
        dispatch({ type: "SUCCESS", payload: response.data });
      } catch (error) {
        dispatch({ type: "ERROR" });
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    dispatch({ type: "TOTAL__AMOUNT" });
  }, [state.cart]);

  const clearCart = () => {
    dispatch({ type: "CLEAR__CART" });
  };
  const removeItem = (id) => {
    dispatch({ type: "REMOVE__ITEM", payload: id });
  };
  const toggleAmount = (id, type) => {
    dispatch({ type: "TOGGLE__AMOUNT", payload: { id, type } });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeItem,
        toggleAmount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

// const array = [
//   { id: 1, fName: "sagar", amount: 1 },
//   { id: 2, fName: "anmol", amount: 1 },
//   { id: 3, fName: "zoey", amount: 1 },
// ];

// array.forEach((item) => (item.amount += 1));
// array.forEach((item) => (item.amount += 1));
// array.forEach((item) => (item.amount += 1));

// console.log(array);
