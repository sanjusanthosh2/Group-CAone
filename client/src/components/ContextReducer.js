import React, { createContext, useContext, useReducer } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          qty: action.qty,
          size: action.size,
          price: action.price,
          img: action.img,
        },
      ];

    case "REMOVE":
      let newArr = [...state];
      newArr.splice(action.index, 1);
      return newArr;

    case "UPDATE":
      let updatedArr = state.map((food) => {
        if (food.id === action.id && food.size === action.size) {
          // Update the existing item with new quantity and price
          return {
            ...food,
            qty: food.qty + parseInt(action.qty), // Increment quantity by the new qty
            price: food.price + action.price,     // Increment price by the new item's price
          };
        }
        return food;
      });
      return updatedArr;
    case "DROP":
      let empArray = []
      return empArray

    default:
      console.log("Error in Reducer");
      return state;
  }
};



export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatch = () => useContext(CartDispatchContext);
