import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ROOM_RATES = {
  Standard: 2000,
  Deluxe: 2000,
  Suite: 2000,
};

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Name is required.";
  if (!form.email.match(/^\S+@\S+\.\S+$/)) errors.email = "Enter a valid email.";
  if (!form.phone.match(/^\d{10}$/)) errors.phone = "Enter a valid 10-digit phone number.";
  if (!form.idType) errors.idType = "Select ID type.";
  if (!form.idNumber.trim()) errors.idNumber = "ID number required.";
  if (!form.country.trim()) errors.country = "Country required.";
  if (!form.address.trim()) errors.address = "Address required.";
  if (!form.checkin) errors.checkin = "Check-in date required.";
  if (!form.checkout) errors.checkout = "Check-out date required.";
  if (form.checkin && form.checkout && new Date(form.checkout) <= new Date(form.checkin)) errors.checkout = "Check-out must be after check-in.";
  if (!form.guests || form.guests < 1) errors.guests = "At least 1 guest required.";
  return errors;
}

function getNights(checkin, checkout) {
  if (!checkin || !checkout) return 1;
  const inDate = new Date(checkin);
  const outDate = new Date(checkout);
  const diff = (outDate - inDate) / (1000 * 60 * 60 * 24);
  return Math.max(1, diff);
}

function getTomorrowDate() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];
}

function getCheckoutMinDate(checkin) {
  if (!checkin) return getTomorrowDate();
  const nextDay = new Date(checkin);
  nextDay.setDate(nextDay.getDate() + 1);
  return nextDay.toISOString().split("T")[0];
}

const fade = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
};

function BillSummary({ form, onPay }) {
  const nights = getNights(form.checkin, form.checkout);
  const subtotal = nights * form.guests;
  const gst = subtotal * 0.18;
  const total = subtotal + gst;
  return (
    <motion.div
      key="bill"
      {...fade}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-2xl shadow-2xl p-8 max-w-md mx-auto mt-6 border border-gray-700"
    >
      <h3 className="text-2xl font-bold text-center mb-6 text-cyan-400 drop-shadow">Bill Summary</h3>
      <div className="space-y-2 text-lg text-gray-200">
        <div className="flex justify-between"><span>Guests:</span><span>{form.guests}</span></div>
        <div className="flex justify-between"><span>Nights:</span><span>{nights}</span></div>
        <div className="flex justify-between font-semibold"><span>Subtotal:</span><span>₹{subtotal.toLocaleString()}</span></div>
        <div className="flex justify-between"><span>GST (18%):</span><span>₹{gst.toLocaleString()}</span></div>
        <div className="flex justify-between text-xl font-bold text-green-400 mt-2"><span>Total:</span><span>₹{total.toLocaleString()}</span></div>
      </div>
      <button
        onClick={onPay}
        className="w-full py-3 rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-600 text-white font-bold shadow-lg hover:from-fuchsia-600 hover:to-cyan-500 transition-all duration-300 hover:scale-105 text-lg mt-8 ring-2 ring-cyan-400/50 focus:ring-4 focus:ring-fuchsia-400/60 focus:outline-none"
      >
        Pay Now
      </button>
    </motion.div>
  );
}

function SuccessMessage() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <motion.div
      key="success"
      {...fade}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-2xl shadow-2xl p-10 max-w-md mx-auto mt-6 border border-gray-700"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className="text-5xl mb-4 text-green-400 drop-shadow"
      >
        <span role="img" aria-label="success">✅</span>
      </motion.div>
      <div className="text-2xl font-bold text-green-400 mb-2 drop-shadow">Payment Successful!</div>
      <div className="text-gray-300 text-center mb-4">Thank you for booking with BookScape.</div>
      <div className="text-blue-400 text-sm">
        Redirecting to home page in {countdown} seconds...
      </div>
    </motion.div>
  );
}

function BookingForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    checkin: "",
    checkout: "",
    guests: 1,
    idType: "",
    idNumber: "",
    country: "",
    address: "",
    specialRequest: "",
  });
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState("form"); // form | bill | success

  // Check authentication on component mount
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      // User is not logged in, redirect to login
      navigate('/login');
      return;
    }

    // Pre-fill form with user data if available
    try {
      const userData = JSON.parse(user);
      setForm(prev => ({
        ...prev,
        name: userData.name || "",
        email: userData.email || ""
      }));
    } catch (error) {
      console.error('Error parsing user data:', error);
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setStep("bill");
    }
  };

  const handlePay = async () => {   
    try {
      // Calculate total amount
      const nights = getNights(form.checkin, form.checkout);
      const subtotal = nights * form.guests;
      const gst = subtotal * 0.18;
      const total = subtotal + gst;

      // Save booking to database
      const response = await fetch('http://localhost:5000/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          idType: form.idType,
          idNumber: form.idNumber,
          country: form.country,
          address: form.address,
          checkin: form.checkin,
          checkout: form.checkout,
          guests: form.guests,
          specialRequest: form.specialRequest,
          totalAmount: total
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Booking saved successfully:', data);
        setStep("success");
      } else {
        console.error('Failed to save booking:', data.error);
        // Still show success since payment was successful
        setStep("success");
      }
    } catch (err) {
      console.error('Error saving booking:', err);
      // Still show success since payment was successful
      setStep("success");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-4 py-10">
      <div className="w-full max-w-xl">
        <AnimatePresence mode="wait">
          {step === "form" && (
            <motion.form
              key="form"
              {...fade}
              transition={{ duration: 0.5 }}
              onSubmit={handleSubmit}
              className="bg-gradient-to-br from-gray-900 via-black to-gray-800/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-700"
              autoComplete="off"
            >
              <h2 className="text-3xl font-bold text-center text-cyan-400 mb-8 font-serif drop-shadow">Booking Details</h2>
              {/* Name */}
              <div className="mb-4">
                <label className="block text-gray-200 mb-1 font-medium">Name</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your Name" className={`form-input ${errors.name ? 'border-red-400' : ''}`} />
                {errors.name && <div className="text-red-400 text-sm mt-1">{errors.name}</div>}
              </div>
              {/* Email */}
              <div className="mb-4">
                <label className="block text-gray-200 mb-1 font-medium">Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@email.com" className={`form-input ${errors.email ? 'border-red-400' : ''}`} />
                {errors.email && <div className="text-red-400 text-sm mt-1">{errors.email}</div>}
              </div>
              {/* Phone */}
              <div className="mb-4">
                <label className="block text-gray-200 mb-1 font-medium">Phone</label>
                <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="10-digit number" className={`form-input ${errors.phone ? 'border-red-400' : ''}`} />
                {errors.phone && <div className="text-red-400 text-sm mt-1">{errors.phone}</div>}
              </div>
              {/* ID Proof Type */}
              <div className="mb-4">
                <label className="block text-gray-200 mb-1 font-medium">ID Proof Type</label>
                <select name="idType" value={form.idType} onChange={handleChange} className={`form-input ${errors.idType ? 'border-red-400' : ''}`}> 
                  <option value="">Select ID</option>
                  <option value="Aadhar">Aadhar</option>
                  <option value="Passport">Passport</option>
                  <option value="Driving License">Driving License</option>
                  <option value="PAN">PAN</option>
                </select>
                {errors.idType && <div className="text-red-400 text-sm mt-1">{errors.idType}</div>}
              </div>
              {/* ID Proof Number */}
              <div className="mb-4">
                <label className="block text-gray-200 mb-1 font-medium">ID Proof Number</label>
                <input type="text" name="idNumber" value={form.idNumber} onChange={handleChange} placeholder="ID Number" className={`form-input ${errors.idNumber ? 'border-red-400' : ''}`} />
                {errors.idNumber && <div className="text-red-400 text-sm mt-1">{errors.idNumber}</div>}
              </div>
              {/* Country */}
              <div className="mb-4">
                <label className="block text-gray-200 mb-1 font-medium">Country</label>
                <input type="text" name="country" value={form.country} onChange={handleChange} placeholder="Country" className={`form-input ${errors.country ? 'border-red-400' : ''}`} />
                {errors.country && <div className="text-red-400 text-sm mt-1">{errors.country}</div>}
              </div>
              {/* Address */}
              <div className="mb-4">
                <label className="block text-gray-200 mb-1 font-medium">Address</label>
                <input type="text" name="address" value={form.address} onChange={handleChange} placeholder="Full Address" className={`form-input ${errors.address ? 'border-red-400' : ''}`} />
                {errors.address && <div className="text-red-400 text-sm mt-1">{errors.address}</div>}
              </div>
              {/* Check-in & Check-out */}
              <div className="flex gap-4 mb-4 flex-col md:flex-row">
                <div className="flex-1">
                  <label className="block text-gray-200 mb-1 font-medium">Check-in</label>
                  <input type="date" name="checkin" value={form.checkin} min={getTomorrowDate()} onChange={handleChange} className={`form-input ${errors.checkin ? 'border-red-400' : ''}`} />
                  {errors.checkin && <div className="text-red-400 text-sm mt-1">{errors.checkin}</div>}
                </div>
                <div className="flex-1">
                  <label className="block text-gray-200 mb-1 font-medium">Check-out</label>
                  <input type="date" name="checkout" value={form.checkout} min={getCheckoutMinDate(form.checkin)} onChange={handleChange} className={`form-input ${errors.checkout ? 'border-red-400' : ''}`} />
                  {errors.checkout && <div className="text-red-400 text-sm mt-1">{errors.checkout}</div>}
                </div>
              </div>
              {/* Guests */}
              <div className="mb-4">
                <label className="block text-gray-200 mb-1 font-medium">Guests</label>
                <input type="number" name="guests" min="1" value={form.guests} onChange={handleChange} className={`form-input ${errors.guests ? 'border-red-400' : ''}`} />
                {errors.guests && <div className="text-red-400 text-sm mt-1">{errors.guests}</div>}
              </div>
              {/* Special Request */}
              <div className="mb-4">
                <label className="block text-gray-200 mb-1 font-medium">Special Request</label>
                <textarea name="specialRequest" value={form.specialRequest} onChange={handleChange} rows={3} placeholder="Any special request..." className="form-input resize-none" />
              </div>
              {/* Submit */}
              <button type="submit" className="w-full py-3 rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-600 text-white font-bold shadow-lg hover:from-fuchsia-600 hover:to-cyan-500 transition-all duration-300 hover:scale-105 text-lg mt-4 ring-2 ring-cyan-400/50 focus:ring-4 focus:ring-fuchsia-400/60 focus:outline-none">
                Submit Booking
              </button>
            </motion.form>
          )}
          {step === "bill" && (
            <BillSummary form={form} onPay={handlePay} />
          )}
          {step === "success" && <SuccessMessage />}
        </AnimatePresence>
      </div>
      {/* Tailwind input style utility */}
      <style>{`
        .form-input {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          background-color: rgba(30,41,59,0.85);
          border: 1.5px solid #334155;
          color: #f1f5f9;
          outline: none;
          font-size: 1rem;
          transition: all 0.3s;
        }
        .form-input:focus {
          border-color: #06b6d4;
          box-shadow: 0 0 0 3px rgba(6,182,212,0.15);
        }
        .form-input::placeholder {
          color: #94a3b8;
        }
      `}</style>
    </div>
  );
}

export default BookingForm;
