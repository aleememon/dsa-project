import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { z } from "zod";

const formSchema = z.object({
  fname: z.string().min(1, "First name is required"),
  lname: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email format"),

});

const RateUs = () => {
  const nav = useNavigate()
  const [contact, setContact] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    review: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = formSchema.safeParse({
      fname: contact.fname,
      lname: contact.lname,
      email: contact.email,
    });

    if (!result.success) {
      const fieldErrors = result.error.errors.reduce((acc, error) => {
        acc[error.path[0]] = error.message;
        return acc;
      }, {});
      setErrors(fieldErrors);
      return;
    }

    
    setErrors({});
    console.log("Form submitted:", contact);
    setContact({
      fname: "",
      lname: "",
      email: "",
      phone: "",
      review: "",
    });

    setTimeout(() => toast("Your Review has been Saved 😊"), 1000);

    setTimeout(() => nav("/home"), 4000)
  };

  return (
    <div className="contact_us_2 text-black font-semibold">
      <div className="relative w-full px-8 py-4 bg-black">
        <div className="container mx-auto max-w-[800px] mt-[120px] mb-[50px] p-10 rounded-lg shadow-md bg-white">
          <form className="form-box" onSubmit={handleSubmit}>
            <div className="container-block form-wrapper">
              <p className="text-blk text-center text-2xl contactus-subhead text-gray-500 mb-12">
                Rate Our European Heritage Restaurant Cafe Europa
              </p>
              <div className="flex flex-wrap">
                <div className="responsive-cell-block w-full sm:w-1/2 mb-6 px-2">
                  <p className="text-blk input-title text-sm text-left text-gray-500 mb-1">
                    FIRST NAME
                  </p>
                  <input
                    value={contact.fname}
                    onChange={handleChange}
                    className="input w-full p-2 border-2 border-gray-200 rounded focus:outline-none focus:border-blue-500"
                    name="fname"
                    placeholder="Please enter first name..."
                  />
                  {errors.fname && (
                    <p className="text-red-500 text-sm mt-1">{errors.fname}</p>
                  )}
                </div>
                <div className="responsive-cell-block w-full sm:w-1/2 mb-6 px-2">
                  <p className="text-blk input-title text-sm text-left text-gray-500 mb-1">
                    LAST NAME
                  </p>
                  <input
                    value={contact.lname}
                    onChange={handleChange}
                    className="input w-full p-2 border-2 border-gray-200 rounded focus:outline-none focus:border-blue-500"
                    name="lname"
                    placeholder="Please enter last name..."
                  />
                  {errors.lname && (
                    <p className="text-red-500 text-sm mt-1">{errors.lname}</p>
                  )}
                </div>
                <div className="responsive-cell-block w-full sm:w-1/2 mb-6 px-2">
                  <p className="text-blk input-title text-sm text-left text-gray-500 mb-1">
                    EMAIL
                  </p>
                  <input
                    value={contact.email}
                    onChange={handleChange}
                    className="input w-full p-2 border-2 border-gray-200 rounded focus:outline-none focus:border-blue-500"
                    name="email"
                    placeholder="Please enter email..."
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                <div className="responsive-cell-block w-full sm:w-1/2 mb-6 px-2">
                  <p className="text-blk input-title text-sm text-left text-gray-500 mb-1">
                    PHONE NUMBER
                  </p>
                  <input
                    value={contact.phone}
                    type="number"
                    onChange={handleChange}
                    className="input w-full p-2 border-2 border-gray-200 rounded focus:outline-none focus:border-blue-500"
                    name="phone"
                    placeholder="Please enter phone number..."
                  />
                </div>
                <div className="responsive-cell-block w-full mb-6 px-2">
                  <p className="text-blk input-title text-sm text-left text-gray-500 mb-1">
                    What you liked about us?
                  </p>
                  <textarea
                    value={contact.review}
                    onChange={handleChange}
                    className="textinput w-full h-[150px] p-2 border-2 border-gray-200 rounded focus:outline-none focus:border-blue-500"
                    name="review"
                    placeholder="Enter your review here..."
                  ></textarea>
                </div>
              </div>
              <button className="submit-btn w-full h-[60px] bg-black text-white font-bold rounded cursor-pointer hover:bg-[#0381fe]">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RateUs;
