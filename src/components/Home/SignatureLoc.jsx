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

function SignatureLoc() {
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

  const locations = [
    {
      city: "Goa",
      desc: "Villas by the sea",
      img: "public/Images/v10.jpg",
    },
    {
      city: "Udaipur",
      desc: "Royal palaces & lake views",
      img: "public/Images/f4.jpg",
    },
    {
      city: "Munnar",
      desc: "Greenery & hilltop retreats",
      img: "public/Images/re10.jpg",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-black via-gray-900 to-black text-white px-6"
    >
      <motion.h2
        initial={{ backgroundPosition: "0% 50%" }}
        animate={{ backgroundPosition: "100% 50%" }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        className="text-5xl font-bold bg-gradient-to-r from-purple-900 to-blue-300 bg-[length:200%_200%] bg-clip-text text-transparent mb-12 text-center"
      >
        Our Signature Locations
      </motion.h2>

      <motion.div
        variants={containerVariants}
        initial={hasAnimated ? false : "hidden"}
        animate={hasAnimated ? "visible" : ""}
        className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto"
      >
        {locations.map((loc, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
            className="rounded-3xl overflow-hidden bg-white/10 backdrop-blur-lg shadow-xl transition duration-300"
          >
            <img src={loc.img} alt={loc.city} className="h-64 w-full object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-1">{loc.city}</h3>
              <p className="text-gray-300">{loc.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default SignatureLoc;
