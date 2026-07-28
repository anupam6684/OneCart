import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import CartTotal from "./CartTotal";
import { orderService } from "../services/orderService";
import { toast } from "react-toastify";
import OrderDoneModal from "./OrderDoneModal";
import { ShopContext } from "../context/ShopContext";

export default function Payment() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [createdOrder, setCreatedOrder] = useState(null);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const [cartData, setCartData] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const {
    cartItems,
    setStep,
    step,
    navigate,
    selectedAddressId,
    fetchUserData,
  } = useContext(ShopContext);

  const handleClick = async () => {
    if (!selectedAddressId) {
      return toast.error("Please select an address.");
    }

    if (!paymentMethod) {
      return toast.error("Please select a payment method.");
    }

    try {
      setIsPlacingOrder(true);
      const response = await orderService.placeOrder({
        addressId: selectedAddressId,
        paymentMethod,
      });

      if (response.data?.success) {
        // 1. Set the created order object
        setCreatedOrder(response.data.order);

        // 2. SHOW MODAL (Do NOT change step or navigate here!)
        setShowSuccessModal(true);

        // 3. Refresh user data / clear cart in background
        if (fetchUserData) fetchUserData();
      } else {
        toast.error(response.data?.message || "Failed to place order.");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to place order.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  // Handler passed to OrderDoneModal button
  const handleModalClose = () => {
    setShowSuccessModal(false);
    setStep(1); // Reset checkout step
    navigate("/orders"); // Redirect to customer orders page
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
    <div className="pt-5" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Title text1="Payment" text2="Page" />
      <div className="row">
        <div className="col-lg-1"></div>

        {/* Payment Gateway Options */}
        <div className="col-12 col-lg-5 d-flex align-items-center justify-content-center">
          <div className="d-flex flex-wrap gap-2 justify-content-center w-100">
            {[
              { id: "RAZORPAY", img: "/razorpay-payment-gateway.png" },
              { id: "PAYTM", img: "/Paytm.png" },
              { id: "STRIPE", img: "/Mobikwik.png" },
              { id: "COD", img: "/cod.png" },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                className={`payment-box btn border rounded-3 p-3 ${
                  paymentMethod === item.id
                    ? "border-primary border-2 shadow-sm bg-light"
                    : "bg-white"
                }`}
                style={{ width: "45%" }}
                onClick={() => setPaymentMethod(item.id)}
              >
                <img
                  src={item.img}
                  alt={item.id}
                  height="30"
                  className="object-fit-contain"
                />
              </button>
            ))}

            <button
              className="btn btn-outline-dark w-100 mt-4 fw-bold rounded-3"
              onClick={() => setStep(step - 1)}
            >
              Back
            </button>
          </div>
        </div>

        {/* Total Amount Summary */}
        <div className="col-12 col-lg-4 border-start mt-4 mt-lg-0">
          <div className="card shadow-sm p-3 border-0 bg-white rounded-3">
            <CartTotal cartData={cartData} paymentBtn={true} />

            <button
              onClick={handleClick}
              disabled={isPlacingOrder}
              className="btn btn-dark w-100 mt-3 fw-bold rounded-3 py-2 shadow-sm"
            >
              {isPlacingOrder ? "Processing Order..." : "Pay Now"}
            </button>
          </div>
        </div>

        <div className="col-lg-2"></div>
      </div>

      {/* RENDER MODAL HERE (AT ROOT LEVEL OF Payment Component) */}
      <OrderDoneModal
        show={showSuccessModal}
        orderDetails={createdOrder}
        handleClose={handleModalClose}
      />
    </div>
  );
}
