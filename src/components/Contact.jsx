import { motion } from "framer-motion";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.name || !form.email || !form.message) {
    alert("Please fill all fields.");
    return;
  }

  try {
    const res = await fetch('https://book-scape-backend.vercel.app/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (res.ok) {
      alert(data.message || '✅ Message sent!');
      setForm({ name: "", email: "", message: "" });
    } else {
      alert(data.error || '❌ Something went wrong.');
    }
  } catch (err) {
    console.error('Submission error:', err);
    alert('⚠️ Failed to connect to the server.');
  }
};


  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-black text-white font-serif min-h-screen">
      <Navbar />
      <section className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white py-20 px-6">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.h2
            initial={{ backgroundPosition: "0% 50%" }}
            animate={{ backgroundPosition: "100% 50%" }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            className="text-5xl font-bold bg-gradient-to-r from-purple-900 to-blue-300 bg-[length:200%_200%] bg-clip-text text-transparent mb-16 text-center"
          >
            Get in Touch With Us
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl shadow-2xl space-y-6"
            >
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <textarea
                rows="5"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Your Message"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
              ></textarea>
              <motion.button
                whileHover={{ scale: 1.05 }}
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-3 rounded-full shadow-md"
              >
                Send Message
              </motion.button>
            </motion.form>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4">
                <FaMapMarkerAlt className="text-2xl text-purple-400" />
                <div>
                  <h4 className="text-xl font-semibold">Visit Us</h4>
                  <p className="text-gray-300">123 Paradise Lane, Goa, India</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <FaPhone className="text-2xl text-purple-400" />
                <div>
                  <h4 className="text-xl font-semibold">Call Us</h4>
                  <p className="text-gray-300">+91 9574343531</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <FaEnvelope className="text-2xl text-purple-400" />
                <div>
                  <h4 className="text-xl font-semibold">Email Us</h4>
                  <p className="text-gray-300">hello@bookscape.com</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Contact;
