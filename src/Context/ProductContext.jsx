import { createContext, useEffect, useState } from "react";
import { getAllProducts } from "../services/allAPIS";

export const ProductContext = createContext();
export const ProductContextProdvider = (props) => {
  const [allProducts, setAllProducts] = useState([]);
  const fetchAllproducts = async () => {
    const result = await getAllProducts();    
    setAllProducts(result.data);
  };  
  useEffect(() => {
    fetchAllproducts();
  }, []);
  const value = { allProducts, setAllProducts,fetchAllproducts };
  return (
    <ProductContext.Provider value={value}>
      {props.children}
    </ProductContext.Provider>
  );
};
