import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Animation variants
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

function GuestSay() {
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

  const testimonials = [
    {
      name: "Anita Mehra",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
      review:
        "BookScape gave us a truly unforgettable vacation. The villa was stunning and the staff made us feel at home.",
    },
    {
      name: "Rohan Patel",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
      review:
        "Absolutely loved the resort! Beautiful interiors, great food, and top-notch service. Highly recommended.",
    },
    {
      name: "Divya Sharma",
      img: "https://randomuser.me/api/portraits/women/68.jpg",
      review:
        "The waterpark was a blast for the whole family. Clean, safe, and packed with fun. We'll definitely return!",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="bg-gradient-to-br from-black via-gray-900 to-black text-white py-20 px-4"
    >
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          initial={{ backgroundPosition: "0% 50%" }}
          animate={{ backgroundPosition: "100% 50%" }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          className="text-5xl font-bold bg-gradient-to-r from-purple-900 to-blue-300 bg-[length:200%_200%] bg-clip-text text-transparent mb-12"
        >
          What Our Guests Say
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial={hasAnimated ? false : "hidden"}
          animate={hasAnimated ? "visible" : ""}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          {testimonials.map((guest, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{ scale: 1.03 }}
              className="bg-white/10 rounded-3xl shadow-xl p-8 backdrop-blur-lg transition"
            >
              <img
                src={guest.img}
                alt={guest.name}
                className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-white"
              />
              <h3 className="text-xl font-semibold mb-2">{guest.name}</h3>
              <p className="text-gray-300 text-sm mb-4">“{guest.review}”</p>
              <div className="flex justify-center gap-1">
                {Array(5)
                  .fill()
                  .map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">
                      ★
                    </span>
                  ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default GuestSay;
