import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { z } from "zod";
import { checkout } from "../features/resturantSlice";
import DialogBox from "./DialogBox"; // Import the dialog box component

const paymentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(1, "Address is required"),
  paymentOption: z.enum(["COD", "Bank Transfer"], "Payment option is required"),
  cardNumber: z
    .string()
    .regex(/^\d{16}$/, "Card number must be 16 digits")
    .optional(),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry date must be in MM/YY format")
    .optional(),
  cvv: z
    .string()
    .regex(/^\d{3}$/, "CVV must be 3 digits")
    .optional(),
});

function Payment() {
  const dispatch = useDispatch();
  const [paymentOption, setPaymentOption] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});
  const [openDialog, setOpenDialog] = useState(false); // State to control dialog visibility

  const handlePaymentOptionChange = (option) => {
    setPaymentOption(option);
    setFormData({ ...formData, paymentOption: option });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const schema =
      paymentOption === "Bank Transfer"
        ? paymentSchema
        : paymentSchema.omit({ cardNumber: true, expiryDate: true, cvv: true });

    const result = schema.safeParse(formData);

    if (!result.success) {
      setErrors(result.error.format());
      console.error("Validation errors:", result.error.format());
      return;
    }

    dispatch(checkout());
    setOpenDialog(true);

    setFormData({
      name: "",
      email: "",
      address: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    });
    setPaymentOption("");
  };

  return (
    <div className="flex items-center justify-center text-black font-semibold min-h-screen ">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Payment Options
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="paymentOption"
                value="COD"
                checked={paymentOption === "COD"}
                onChange={() => handlePaymentOptionChange("COD")}
                className="form-radio h-5 w-5 text-blue-600"
              />
              <span className="text-lg">Cash on Delivery</span>
            </label>
          </div>

          <div>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="paymentOption"
                value="Bank Transfer"
                checked={paymentOption === "Bank Transfer"}
                onChange={() => handlePaymentOptionChange("Bank Transfer")}
                className="form-radio h-5 w-5 text-blue-600"
              />
              <span className="text-lg">Bank Transfer</span>
            </label>
          </div>

          {["name", "email", "address"].map((field) => (
            <div key={field}>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={`Enter your ${field}`}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {errors[field] && (
                <p className="text-red-500 text-sm">
                  {errors[field]._errors[0]}
                </p>
              )}
            </div>
          ))}

          {paymentOption === "Bank Transfer" && (
            <>
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Card Number
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  placeholder="Enter your card number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {errors.cardNumber && (
                  <p className="text-red-500 text-sm">
                    {errors.cardNumber._errors[0]}
                  </p>
                )}
              </div>

              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  {errors.expiryDate && (
                    <p className="text-red-500 text-sm">
                      {errors.expiryDate._errors[0]}
                    </p>
                  )}
                </div>

                <div className="w-1/2">
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    placeholder="CVV"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  {errors.cvv && (
                    <p className="text-red-500 text-sm">
                      {errors.cvv._errors[0]}
                    </p>
                  )}
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Confirm Payment Method
          </button>
        </form>
      </div>
      <ToastContainer />
      {/* Render the DialogBox component */}
      <DialogBox open={openDialog} onClose={() => setOpenDialog(false)} />
    </div>
  );
}

export default Payment;
