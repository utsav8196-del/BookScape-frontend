import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

function Moment() {
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

  return (
    <section
      ref={sectionRef}
      className="py-20 px-6 bg-gradient-to-br from-black via-gray-900 to-black text-white"
    >
      <motion.h2
        initial={{ backgroundPosition: "0% 50%" }}
        animate={{ backgroundPosition: "100% 50%" }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        className="text-5xl font-bold bg-gradient-to-r from-purple-900 to-blue-300 bg-[length:200%_200%] bg-clip-text text-transparent mb-8"
      >
        Moment Captured by Guest
      </motion.h2>

      <motion.div
        variants={containerVariants}
        initial={hasAnimated ? false : "hidden"}
        animate={hasAnimated ? "visible" : ""}
        className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto"
      >
        {[
          "public/Images/m1.jpg",
          "public/Images/m2.jpg",
          "public/Images/m3.jpg",
          "public/Images/m4.jpg",
          "public/Images/m5.jpg",
          "public/Images/m6.jpg",
        ].map((img, i) => (
          <motion.img
            key={i}
            variants={imageVariants}
            whileHover={{ scale: 1.05 }}
            src={img}
            alt={`Guest Memory ${i}`}
            className="rounded-xl object-cover h-64 w-full transition shadow-lg"
          />
        ))}
      </motion.div>
    </section>
  );
}

export default Moment;
