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
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

function WhyChoose() {
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

  const items = [
    {
      icon: "🌍",
      title: "Handpicked Destinations",
      desc: "Each location is carefully selected for charm, views, and local culture.",
    },
    {
      icon: "🛎️",
      title: "24/7 Concierge",
      desc: "Exceptional service to assist you anytime, anywhere.",
    },
    {
      icon: "✨",
      title: "Curated Luxury",
      desc: "Experience unmatched interiors, amenities, and hospitality.",
    },
    {
      icon: "💰",
      title: "Best Price Guarantee",
      desc: "Luxury doesn’t mean overpriced. We ensure the best value always.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20 px-6 bg-gradient-to-br from-black via-gray-900 to-black text-white"
    >
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          initial={{ backgroundPosition: "0% 50%" }}
          animate={{ backgroundPosition: "100% 50%" }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          className="text-5xl font-bold bg-gradient-to-r from-purple-900 to-blue-300 bg-[length:200%_200%] bg-clip-text text-transparent mb-12"
        >
          Why Choose BookScape
        </motion.h2>
        <p className="text-gray-400 text-lg mb-16 max-w-3xl mx-auto">
          More than a stay — a story. Our commitment is to provide not just luxury, but unforgettable experiences.
        </p>

        <motion.div
          variants={containerVariants}
          initial={hasAnimated ? false : "hidden"}
          animate={hasAnimated ? "visible" : ""}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {items.map((item, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-lg text-center transition"
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-300">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default WhyChoose;
