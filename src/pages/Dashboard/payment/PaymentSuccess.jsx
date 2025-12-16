import axios from "axios";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router";
import { toast } from "react-toastify";

const PaymentSuccess = () => {
  const [params] = useSearchParams();

  const orderId = params.get("orderId");

  useEffect(() => {
    if (!orderId) return;

    axios
      .post(`${import.meta.env.VITE_API_URL}/payment-success`, {
        orderId,
      })
      .then(() => {
        toast.success("Payment Successful");
      })
      .catch(() => {
        toast.error("Payment update failed");
      });
  }, [orderId]);

  return (
    <div className="flex justify-center items-center">
      <img src="https://i.ibb.co.com/Xfs6x758/Paymentsuccessful21.png" alt="" />
    </div>
  );
};

export default PaymentSuccess;
