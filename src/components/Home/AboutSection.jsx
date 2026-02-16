import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: "easeInOut" },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

function AboutSection() {
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimated]);

  return (
    <section
      ref={sectionRef}
      className="py-20 px-6 bg-gradient-to-br from-black via-gray-900 to-black md:px-0"
    >
      <motion.div
        variants={containerVariants}
        initial={hasAnimated ? false : "hidden"}
        animate={hasAnimated ? "visible" : ""}
        className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-center"
      >
        {/* Two Overlapping Photos */}
        <motion.div
          variants={staggerContainer}
          initial={hasAnimated ? false : "hidden"}
          animate={hasAnimated ? "visible" : ""}
          className="relative md:w-1/2 w-full h-[30rem]"
        >
          <motion.div
            variants={imageVariants}
            whileHover={{ scale: 1.03 }}
            className="absolute top-0 left-0 w-[65%] h-[65%] rounded-xl overflow-hidden shadow-2xl border border-white/10"
          >
            <img
              src="Images/re8.jpg"
              alt="Luxury Interior"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div
            variants={imageVariants}
            whileHover={{ scale: 1.03 }}
            className="absolute bottom-0 right-0 w-[65%] h-[65%] rounded-xl overflow-hidden shadow-2xl border border-white/10"
          >
            <img
              src="Images/m5.jpg"
              alt="Hotel Hallway"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          variants={staggerContainer}
          initial={hasAnimated ? false : "hidden"}
          animate={hasAnimated ? "visible" : ""}
          className="md:w-1/2 text-center md:text-left"
        >
          <motion.h3
            variants={containerVariants}
            className="text-blue-400 uppercase tracking-widest mb-2"
          >
            About Us
          </motion.h3>

          <motion.h2
            className="text-4xl font-bold bg-gradient-to-r from-purple-900 to-blue-300 bg-[length:200%_200%] bg-clip-text text-transparent mb-4"
            initial={{ backgroundPosition: "0% 50%" }}
            animate={{ backgroundPosition: "100% 50%" }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          >
            about BookScape
          </motion.h2>

          <motion.p
            variants={containerVariants}
            className="text-gray-300 mb-8 leading-relaxed"
          >
            A haven of refined luxury — BookScape blends rich heritage with modern
            hospitality. We are committed to unforgettable experiences and timeless
            moments.
          </motion.p>

          <motion.div
            variants={containerVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-8"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-blue-600 to-purple-400 text-white rounded-xl p-5 min-w-[120px] shadow-lg"
            >
              <h4 className="text-3xl font-bold">100+</h4>
              <p className="text-sm">Luxury Rooms</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-purple-400 to-purple-700 text-white rounded-xl p-5 min-w-[120px] shadow-lg"
            >
              <h4 className="text-3xl font-bold">99%</h4>
              <p className="text-sm">Positive Reviews</p>
            </motion.div>
          </motion.div>

          <motion.a
            variants={containerVariants}
            whileHover={{ scale: 1.05 }}
            href="/About"
            className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-700 rounded-full shadow-lg font-medium"
          >
            Read More
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default AboutSection;
