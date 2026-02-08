import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";

export default function CartTotal({ cartData, paymentBtn }) {
  const {
    currency,
    delivery_fee,
    setStep,
    step,
    getTotalAmount,
    products,
    cartItems,
  } = useContext(ShopContext);

  //getTotal Discount
  const getTotalDiscount = () => {
    let totalDiscount = 0;

    for (let itemId in cartItems) {
      const product = products.find((p) => p._id == itemId);
      if (!product) continue;

      for (let size in cartItems[itemId]) {
        const qty = cartItems[itemId][size];

        if (qty > 0) {
          totalDiscount += product.oldPrice * qty;
        }
      }
    }

    return totalDiscount;
  };

  return (
    <div className="card-body">
      <h5 className="mb-3">Price Details</h5>

      <div className="d-flex justify-content-between mb-2">
        <span>Total Items</span>
        <span>{cartData.length}</span>
      </div>

      <div className="d-flex justify-content-between mb-2">
        <span>MRP- </span>
        <span className="text-decoration-line-through">
          {currency}
          {getTotalDiscount()}.00
        </span>
      </div>
      <div className="d-flex justify-content-between mb-2">
        <span>Total Product Price- </span>
        <span>
          {currency}
          {getTotalAmount()}.00
        </span>
      </div>

      <div className="d-flex justify-content-between mb-2">
        <span>Discount On MRP</span>
        <span className=" d-flex text-success ">
          <div className=" small">
            (
            {Math.round(
              ((getTotalDiscount() - getTotalAmount()) / getTotalDiscount()) *
                100,
            )}
            % OFF)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </div>

          <div>
            −{currency} {getTotalDiscount() - getTotalAmount()}.00
          </div>
        </span>
      </div>
      <div className="d-flex justify-content-between mb-2">
        <span>Platform Fee</span>
        <span>
          {currency}
          {delivery_fee}.00
        </span>
      </div>

      <hr />

      <div className="d-flex justify-content-between fw-bold fs-5">
        <span>Total</span>
        <span>
          {currency}
          {getTotalAmount() + delivery_fee}.00
        </span>
      </div>

      <button
        style={{ display: paymentBtn ? "none" : "block" }}
        className="btn btn-dark w-100 mt-3 "
        onClick={() => {
          setStep(step + 1);
        }}
      >
        Proceed to Checkout
      </button>
    </div>
  );
}
