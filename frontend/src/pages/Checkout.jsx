import Stepper from "@mui/material/Stepper";
import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import OrderStepper from "../components/OrderStepper";
import Cart from "../components/Cart";
import Address from "../components/Address";
import Payment from "../components/Payment";

export default function Checkout() {
  const { step } = useContext(ShopContext);
  return (
    <>
      <OrderStepper currentStep={step} />
      {step === 1 && <Cart />}
      {step === 2 && <Address />}
      {step === 3 && <Payment />}
    </>
  );
}
