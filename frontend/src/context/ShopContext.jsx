import { createContext } from "react";
import products from "../assets/data";

export const ShopContext = createContext(); // context create, Empty store

const ShopContextProvider = (props) => {
  const currency = "₹";
  const delivery_fee = 40;
  const value = {
    currency,
    delivery_fee,
    products,
  };
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};
export default ShopContextProvider;
