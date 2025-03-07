
import { createContext, useEffect, useState } from "react";
import {  getOrders } from "../services/allAPIS";

export const OrderContext = createContext();
export const OrderContextProvider = (props) => {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
    fetchOrders();
  }, []);
  
  const fetchOrders = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        return;
      }
      const reqHeader = { authorization: `Bearer ${token}` };
      const response = await getOrders(reqHeader);
      console.log(response);
      
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  const value = { orders, setOrders ,fetchOrders};
  return (
    <OrderContext.Provider value={value}>{props.children}</OrderContext.Provider>
  );
};