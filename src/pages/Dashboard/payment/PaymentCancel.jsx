import React from "react";

const PaymentCancel = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
        <img
          src="https://i.ibb.co.com/1trCSsJN/Payment-Cancelled.png"
          alt="Payment Cancelled"
          className="w-48 mx-auto mb-6"
        />

        <p className="text-gray-600 mb-6">
          Your payment was not completed. You can try again or go back to the
          home page.
        </p>

        <div className="flex gap-4 justify-center">
          <button
            className="px-6 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition"
            onClick={() => window.history.back()}
          >
            Try Again
          </button>

          <button
            className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition"
            onClick={() => (window.location.href = "/")}
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
