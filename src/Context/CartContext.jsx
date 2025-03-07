import { createContext, useEffect, useState } from "react";
import { getCartItems } from "../services/allAPIS";

export const CartContext = createContext();
export const CartContextProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const fetchCartItems = async () => {
      const token = sessionStorage.getItem("token");
         if (token) {
           const reqHeader = { authorization: `Bearer ${token}` };
           const response = await getCartItems(reqHeader);
           console.log(response.data.products);
           
           setCartItems(response.data.products);
         }
         console.log(cartItems);
         
  };
  useEffect(() => {
    fetchCartItems();
  }, []);
  const value = { cartItems, setCartItems ,fetchCartItems};
  return (
    <CartContext.Provider value={value}>{props.children}</CartContext.Provider>
  );
};
