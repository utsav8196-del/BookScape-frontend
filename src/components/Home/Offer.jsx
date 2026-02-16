import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Animation Variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeInOut" },
  },
};

function Offer() {
  const sectionRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, [hasAnimated]);

  const offers = [
    {
      title: "Monsoon Magic Getaway",
      img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      offer: "Flat 20% Off",
      desc: "Enjoy Goa's beauty with our monsoon villa packages.",
    },
    {
      title: "Summer Splash Deal",
      img: "public/Images/w12.jpg",
      offer: "Kids Stay Free",
      desc: "Beat the heat with fun-filled waterpark adventures.",
    },
    {
      title: "Winter Bliss Retreat",
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      offer: "3 Nights @ 2",
      desc: "Cozy winter hideouts with bonfires & luxury.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20 px-6 bg-gradient-to-br from-black via-gray-900 to-black text-white"
    >
      <motion.h2
        initial={{ backgroundPosition: "0% 50%" }}
        animate={{ backgroundPosition: "100% 50%" }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        className="text-5xl font-bold bg-gradient-to-r from-purple-900 to-blue-300 bg-[length:200%_200%] bg-clip-text text-transparent mb-12 text-center"
      >
        Exclusive Seasonal Offers
      </motion.h2>

      <motion.div
        variants={containerVariants}
        initial={hasAnimated ? false : "hidden"}
        animate={hasAnimated ? "visible" : ""}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10"
      >
        {offers.map((d, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            whileHover={{
              scale: 1.04,
              boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
            }}
            className="bg-white/10 backdrop-blur-lg rounded-3xl overflow-hidden shadow-2xl border border-white/20 transition-all duration-300"
          >
            <div className="relative">
              <img src={d.img} alt={d.title} className="h-64 w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end">
                <h3 className="text-2xl font-extrabold text-white drop-shadow mb-1">
                  {d.title}
                </h3>
                <span className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-3 py-1 rounded-full text-sm shadow-lg mb-2 w-max">
                  {d.offer}
                </span>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-200 text-base leading-relaxed">{d.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default Offer;
