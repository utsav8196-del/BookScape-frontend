import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const featured = [
  {
    name: "Coastal Dream Villa",
    img: "https://images.unsplash.com/photo-1600585153943-008bb68b1b2b",
    location: "Goa, India",
    price: "₹12,000 / night",
  },
  {
    name: "Rustic Farm Escape",
    img: "https://images.unsplash.com/photo-1554995207-c18c203602cb",
    location: "Nashik, Maharashtra",
    price: "₹6,500 / night",
  },
  {
    name: "Luxury Resort Retreat",
    img: "https://images.unsplash.com/photo-1582719478144-bb80260d07e8",
    location: "Udaipur, Rajasthan",
    price: "₹9,800 / night",
  },
];

// Animation variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

function NewPhotoCard() {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Section Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-5xl font-bold text-center bg-gradient-to-r from-purple-900 to-blue-300 bg-[length:200%_200%] bg-clip-text text-transparent mb-12"
      >
        Discover Our Stays
      </motion.h2>

      {/* Card Grid */}
      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {[
          {
            title: "Urban Luxury Hotel",
            desc: "Experience city sophistication and comfort in our modern luxury hotels, designed for the discerning traveler.",
            img: "Images/h3.jpg",
          },
          {
            title: "Vibrant Waterpark",
            desc: "Dive into fun and excitement at our vibrant waterparks, perfect for families and thrill-seekers alike.",
            img: "Images/w10.jpg",
          },
          {
            title: "Serene Private Villa",
            desc: "Unwind in a tranquil villa surrounded by nature, offering privacy, elegance, and breathtaking views.",
            img: "Images/v10.jpg",
          },
        ].map((stay, idx) => (
          <motion.div
            key={idx}
            variants={cardVariants}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
            className="bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl flex flex-col transition-all"
          >
            <img
              src={stay.img}
              alt={stay.title}
              className="h-64 w-full object-cover"
            />
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-2xl md:text-2xl font-bold mb-4 font-serif tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                {stay.title}
              </h3>
              <p className="text-gray-200 leading-relaxed flex-grow">
                {stay.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default NewPhotoCard;
