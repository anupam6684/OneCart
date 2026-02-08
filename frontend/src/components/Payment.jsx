import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import CartTotal from "./CartTotal";

import { ShopContext } from "../context/ShopContext";
export default function Payment() {
  const [cartData, setCartData] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const { cartItems, setStep, step, navigate } = useContext(ShopContext);
  const handleClick = () => {
    setStep(step + 1);
    navigate("/orders");
    setStep(1);
  };

  useEffect(() => {
    const tempData = [];

    for (let itemId in cartItems) {
      for (let size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          tempData.push({
            _id: itemId,
            size,
            quantity: cartItems[itemId][size],
          });
        }
      }
    }

    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className="pt-5">
      <Title text1="Payment" text2="Page" />
      <div className="row">
        <div className="col-lg-1"></div>
        {/* payment getway */}

        <div className="col-12 col-lg-5 d-flex align-items-center justify-content-center">
          <div className="d-flex flex-wrap gap-1 ">
            {[
              { id: "razorpay", img: "/razorpay-payment-gateway.png" },
              { id: "paytm", img: "/Paytm.png" },
              { id: "mobikwik", img: "/Mobikwik.png" },
              { id: "cod", img: "/cod.png" },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                className={`payment-box btn ${
                  paymentMethod === item.id ? "active" : ""
                }`}
                onClick={() => setPaymentMethod(item.id)}
              >
                <img src={item.img} alt={item.id} height="30" />
              </button>
            ))}

            <button
              className="btn btn-dark w-100 mt-4 fw-bold"
              onClick={() => setStep(step - 1)}
            >
              Back
            </button>
          </div>
        </div>

        {/* total amount */}
        <div className="col-12 col-lg-4 border-start">
          <div className="card shadow-sm p-3">
            <CartTotal cartData={cartData} paymentBtn={true} />

            <button
              onClick={handleClick}
              className="btn btn-dark w-100 mt-3 fw-bold"
            >
              Pay Now
            </button>
          </div>
        </div>

        <div className="col-lg-2"></div>
      </div>
    </div>
  );
}
