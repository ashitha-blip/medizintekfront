import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ProductContextProdvider } from "./Context/ProductContext.jsx";
import { UserContextProvider } from "./Context/UserContext.jsx";
import { CartContextProvider } from "./Context/CartContext.jsx";
import { OrderContextProvider } from "./Context/OrderContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ProductContextProdvider>
        <UserContextProvider>
          <CartContextProvider>
            <OrderContextProvider>
              <App />
            </OrderContextProvider>
          </CartContextProvider>
        </UserContextProvider>
      </ProductContextProdvider>
    </BrowserRouter>
  </StrictMode>
);
