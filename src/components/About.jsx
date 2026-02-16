import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";

function About() {
  const galleryItems = [
    { img: "/public/Images/h9.jpg", alt: "Luxury Hotel" },
    { img: "/public/Images/v6.jpg", alt: "Private Villa" },
    { img: "/public/Images/re6.jpg", alt: "Poolside" },
    { img: "/public/Images/w10.jpg", alt: "Waterpark" },
    { img: "/public/Images/v10.jpg", alt: "Group Fun" },
    {
      img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
      alt: "Restaurant Dining",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-black text-white font-serif min-h-screen">
      <Navbar />

      <section className="py-20 px-6 mt-2">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-center"
        >
          <h2 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text mb-6 drop-shadow-xl">
            About BookScape
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            BookScape curates premium luxury experiences across stunning destinations.
            From private villas and elegant hotels to thrilling waterparks, we craft
            moments that last a lifetime — where comfort meets class.
          </p>
        </motion.div>

        {/* Gallery Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto mt-16"
        >
          {galleryItems.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="rounded-3xl overflow-hidden shadow-xl bg-white/10 backdrop-blur-md transition-all duration-300 border border-white/10"
            >
              <img
                src={item.img}
                alt={item.alt}
                className="w-full h-64 object-cover transform hover:scale-110 transition-transform duration-500"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <div className="text-center mt-16">
          <motion.a
            href="/"
            whileHover={{ scale: 1.08 }}
            className="inline-block px-7 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-xl hover:from-purple-600 hover:to-pink-500 transition-all duration-300 text-lg"
          >
            ⬅ Back to Home
          </motion.a>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default About;
