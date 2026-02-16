import { motion } from "framer-motion";

function Hero() {
  return (<>
    <section className="relative min-h-screen bg-cover bg-center z-5 pt-16" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80')" }}>
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/30" />
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="text-5xl md:text-7xl font-extrabold mb-6 drop-shadow-lg">
            Escape. Relax. Enjoy.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }} className="text-xl md:text-2xl max-w-3xl mb-8 font-light text-gray-200">
            Discover handpicked luxury stays, breathtaking villas, and unforgettable experiences with BookScape.
          </motion.p>
          <motion.a initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.5 }} href="#categories" className="
            px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600
            text-white font-semibold shadow-lg hover:scale-105 transition active:scale-95"
          >
            Explore Stays
          </motion.a>
          <div className="mt-6 text-gray-300">Trusted by <span className="font-medium">1,00,000+</span> happy travelers</div>
        </div>
      </section>
    </>
  );
}

export default Hero;