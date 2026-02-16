import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaHome, FaTree, FaUmbrellaBeach, FaHotel } from "react-icons/fa";

// Category data
const categories = [
  {
    name: "Villa",
    img: "https://images.unsplash.com/photo-1464983953574-0892a716854b",
    icon: <FaHome className="text-3xl text-white drop-shadow-lg" />,
  },
  {
    name: "Farmhouse",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    icon: <FaTree className="text-3xl text-white drop-shadow-lg" />,
  },
  {
    name: "Resort",
    img: "/public/Images/re6.jpg",
    icon: <FaUmbrellaBeach className="text-3xl text-white drop-shadow-lg" />,
  },
  {
    name: "Hotel",
    img: "/public/Images/h3.jpg",
    icon: <FaHotel className="text-3xl text-white drop-shadow-lg" />,
  },
  {
    name: "Waterpark",
    img: "/public/Images/w10.jpg",
    icon: <FaUmbrellaBeach className="text-3xl text-white drop-shadow-lg" />,
  },
  {
    name: "Restaurant",
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    icon: <FaHome className="text-3xl text-white drop-shadow-lg" />,
  },
];

// Animation Variant for each card
const cardVariant = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 1,
      ease: "easeOut",
    },
  }),
};

function Categories() {
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
      id="categories"
      ref={sectionRef}
      className="py-20 px-6 bg-gradient-to-br from-black via-gray-900 to-black text-white"
    >
      <motion.h2
        initial={{ backgroundPosition: "0% 50%" }}
        animate={{ backgroundPosition: "100% 50%" }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        className="text-5xl font-bold bg-gradient-to-r from-purple-900 to-blue-300 bg-[length:200%_200%] bg-clip-text text-transparent mb-12 text-center"
      >
        Explore by Category
      </motion.h2>

      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-8">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            custom={i}
            variants={cardVariant}
            initial="hidden"
            animate={hasAnimated ? "visible" : "hidden"}
            whileHover={{ scale: 1.045 }}
            className="relative overflow-hidden rounded-2xl shadow-xl group cursor-pointer transition-all duration-300"
          >
            <img
              src={cat.img}
              alt={cat.name}
              className="h-48 w-full object-cover group-hover:scale-105 group-hover:brightness-110 transition duration-500 ease-in-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
              <div className="flex items-center gap-2">
                {cat.icon}
                <span className="text-white font-semibold text-lg drop-shadow">
                  {cat.name}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Categories;
