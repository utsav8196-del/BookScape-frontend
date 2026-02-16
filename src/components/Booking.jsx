import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { FaFire, FaHome, FaTree, FaUmbrellaBeach, FaHotel, FaUtensils, FaWater } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Trending", icon: <FaFire size={32} /> },
  { name: "Hotel", icon: <FaHotel size={32} /> },
  { name: "Restaurant", icon: <FaUtensils size={32} /> },
  { name: "Villa", icon: <FaHome size={32} /> },
  { name: "Farm House", icon: <FaTree size={32} /> },
  { name: "Waterpark", icon: <FaWater size={32} /> },
  { name: "Resort", icon: <FaUmbrellaBeach size={32} /> },
];

// Helper to generate placeholder images
// const placeholder = (seed) => `https://source.unsplash.com/400x300/?hotel,${seed}`;

const allProperties = [
  // Hotel (12)
  { name: "Coastal Dream Villa", img: "/public/Images/h1.jpg", location: "Goa, India", price: "₹12,000 / night", category: "Hotel" },
  { name: "Urban Luxury Hotel", img: "/public/Images/h2.jpg", location: "Mumbai, India", price: "₹10,000 / night", category: "Hotel" },
  { name: "Skyline Suites", img: "/public/Images/h3.jpg", location: "Delhi, India", price: "₹11,500 / night", category: "Hotel" },
  { name: "City Center Hotel", img: "/public/Images/h4.jpg", location: "Bangalore, India", price: "₹9,800 / night", category: "Hotel" },
  { name: "Grand Palace", img: "/public/Images/h5.jpg", location: "Jaipur, India", price: "₹13,000 / night", category: "Hotel" },
  { name: "Sunset Inn", img: "/public/Images/h6.jpg", location: "Chennai, India", price: "₹8,900 / night", category: "Hotel" },
  { name: "Royal Stay", img: "/public/Images/h7.jpg", location: "Hyderabad, India", price: "₹10,200 / night", category: "Hotel" },
  { name: "Lakeview Hotel", img: "/public/Images/h8.jpg", location: "Udaipur, India", price: "₹12,500 / night", category: "Hotel" },
  { name: "Mountain View", img: "/public/Images/h9.jpg", location: "Manali, India", price: "₹9,600 / night", category: "Hotel" },
  { name: "Pearl Residency", img: "/public/Images/h10.jpg", location: "Kolkata, India", price: "₹8,700 / night", category: "Hotel" },
  { name: "Elite Grand", img: "/public/Images/h11.jpg", location: "Pune, India", price: "₹11,000 / night", category: "Hotel" },
  { name: "Harbor Hotel", img: "/public/Images/h12.jpg", location: "Kochi, India", price: "₹10,800 / night", category: "Hotel" },

  // Restaurant (12)
  { name: "Skyline Dine", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836", location: "Delhi, India", price: "₹2,000 / meal", category: "Restaurant" },
  { name: "Seaside Eats", img: "/public/Images/r1.jpg", location: "Goa, India", price: "₹1,800 / meal", category: "Restaurant" },
  { name: "Urban Bites", img: "/public/Images/r2.jpg", location: "Mumbai, India", price: "₹2,200 / meal", category: "Restaurant" },
  { name: "Garden Grill", img: "/public/Images/r3.jpg", location: "Bangalore, India", price: "₹1,900 / meal", category: "Restaurant" },
  { name: "Royal Feast", img: "/public/Images/r4.jpg", location: "Jaipur, India", price: "₹2,500 / meal", category: "Restaurant" },
  { name: "Spice Route", img: "/public/Images/r5.jpg", location: "Chennai, India", price: "₹1,700 / meal", category: "Restaurant" },
  { name: "The Gourmet", img: "/public/Images/r6.jpg", location: "Hyderabad, India", price: "₹2,100 / meal", category: "Restaurant" },
  { name: "Lakeview Diner", img: "/public/Images/r7.jpg", location: "Udaipur, India", price: "₹2,300 / meal", category: "Restaurant" },
  { name: "Mountain Café", img: "/public/Images/r8.jpg", location: "Manali, India", price: "₹1,800 / meal", category: "Restaurant" },
  { name: "Pearl Kitchen", img: "/public/Images/r9.jpg", location: "Kolkata, India", price: "₹2,000 / meal", category: "Restaurant" },
  { name: "Elite Eats", img: "/public/Images/r10.jpg", location: "Pune, India", price: "₹2,400 / meal", category: "Restaurant" },
  { name: "Harbor Café", img: "/public/Images/r11.jpg", location: "Kochi, India", price: "₹2,100 / meal", category: "Restaurant" },

  // Villa (12)
  { name: "Serene Private Villa", img: "/public/Images/v1.jpg", location: "Lonavala, India", price: "₹8,500 / night", category: "Villa" },
  { name: "Hilltop Villa", img: "/public/Images/v10.jpg", location: "Shimla, India", price: "₹9,200 / night", category: "Villa" },
  { name: "Sunset Villa", img: "/public/Images/v2.jpg", location: "Goa, India", price: "₹10,000 / night", category: "Villa" },
  { name: "Palm Villa", img: "/public/Images/v3.jpg", location: "Kerala, India", price: "₹8,800 / night", category: "Villa" },
  { name: "Royal Villa", img: "/public/Images/v13.jpg", location: "Jaipur, India", price: "₹11,000 / night", category: "Villa" },
  { name: "Spice Villa", img: "/public/Images/v5.jpg", location: "Chennai, India", price: "₹9,500 / night", category: "Villa" },
  { name: "The Grand Villa", img: "/public/Images/v6.jpg", location: "Hyderabad, India", price: "₹10,200 / night", category: "Villa" },
  { name: "Lakeview Villa", img: "/public/Images/v8.jpg", location: "Udaipur, India", price: "₹12,000 / night", category: "Villa" },
  { name: "Mountain Villa", img: "/public/Images/v9.jpg", location: "Manali, India", price: "₹9,800 / night", category: "Villa" },
  { name: "Pearl Villa", img: "/public/Images/v7.jpg", location: "Kolkata, India", price: "₹8,900 / night", category: "Villa" },
  { name: "Elite Villa", img: "/public/Images/v11.jpg", location: "Pune, India", price: "₹10,500 / night", category: "Villa" },
  { name: "Harbor Villa", img: "/public/Images/v12.jpg", location: "Kochi, India", price: "₹9,700 / night", category: "Villa" },

  // Farm House (12)
  { name: "Rustic Farm Escape", img: "/public/Images/f2.jpg", location: "Nashik, Maharashtra", price: "₹6,500 / night", category: "Farm House" },
  { name: "Green Acres Farm", img: "/public/Images/f4.jpg", location: "Punjab, India", price: "₹7,000 / night", category: "Farm House" },
  { name: "Sunset Farm", img: "/public/Images/f1.jpg", location: "Goa, India", price: "₹8,000 / night", category: "Farm House" },
  { name: "Palm Farm", img: "/public/Images/f12.jpg", location: "Kerala, India", price: "₹7,800 / night", category: "Farm House" },
  { name: "Royal Farm", img: "/public/Images/f3.jpg", location: "Jaipur, India", price: "₹9,000 / night", category: "Farm House" },
  { name: "Spice Farm", img: "/public/Images/f5.jpg", location: "Chennai, India", price: "₹7,500 / night", category: "Farm House" },
  { name: "The Grand Farm", img: "/public/Images/f6.jpg", location: "Hyderabad, India", price: "₹8,200 / night", category: "Farm House" },
  { name: "Lakeview Farm", img: "/public/Images/f7.jpg", location: "Udaipur, India", price: "₹9,000 / night", category: "Farm House" },
  { name: "Mountain Farm", img: "/public/Images/f8.jpg", location: "Manali, India", price: "₹7,900 / night", category: "Farm House" },
  { name: "Pearl Farm", img: "/public/Images/f9.jpg", location: "Kolkata, India", price: "₹7,600 / night", category: "Farm House" },
  { name: "Elite Farm", img: "/public/Images/f10.jpg", location: "Pune, India", price: "₹8,400 / night", category: "Farm House" },
  { name: "Harbor Farm", img: "/public/Images/f11.jpg", location: "Kochi, India", price: "₹7,700 / night", category: "Farm House" },

  // Waterpark (12)
  { name: "Splash Waterpark", img: "/public/Images/w2.jpg", location: "Pune, India", price: "₹1,200 / entry", category: "Waterpark" },
  { name: "Aqua Fun Park", img: "/public/Images/w4.jpg", location: "Bangalore, India", price: "₹1,500 / entry", category: "Waterpark" },
  { name: "Sunset Waterpark", img: "/public/Images/w3.jpg", location: "Goa, India", price: "₹1,800 / entry", category: "Waterpark" },
  { name: "Palm Waterpark", img: "/public/Images/w1.jpg", location: "Kerala, India", price: "₹1,700 / entry", category: "Waterpark" },
  { name: "Royal Waterpark", img: "/public/Images/w6.jpg", location: "Jaipur, India", price: "₹2,000 / entry", category: "Waterpark" },
  { name: "Spice Waterpark", img: "/public/Images/w5.jpg", location: "Chennai, India", price: "₹1,600 / entry", category: "Waterpark" },
  { name: "The Grand Waterpark", img: "/public/Images/w7.jpg", location: "Hyderabad, India", price: "₹1,900 / entry", category: "Waterpark" },
  { name: "Lakeview Waterpark", img: "/public/Images/w8.jpg", location: "Udaipur, India", price: "₹2,100 / entry", category: "Waterpark" },
  { name: "Mountain Waterpark", img: "/public/Images/w9.jpg", location: "Manali, India", price: "₹1,800 / entry", category: "Waterpark" },
  { name: "Pearl Waterpark", img: "/public/Images/w10.jpg", location: "Kolkata, India", price: "₹1,500 / entry", category: "Waterpark" },
  { name: "Elite Waterpark", img: "/public/Images/w11.jpg", location: "Pune, India", price: "₹2,200 / entry", category: "Waterpark" },
  { name: "Harbor Waterpark", img: "/public/Images/w12.jpg", location: "Kochi, India", price: "₹1,700 / entry", category: "Waterpark" },

  // Resort (12)
  { name: "Luxury Resort Retreat", img: "/public/Images/re1.jpg", location: "Udaipur, Rajasthan", price: "₹9,800 / night", category: "Resort" },
  { name: "Beachside Resort", img: "/public/Images/re2.jpg", location: "Goa, India", price: "₹11,000 / night", category: "Resort" },
  { name: "Sunset Resort", img: "/public/Images/re3.jpg", location: "Goa, India", price: "₹12,000 / night", category: "Resort" },
  { name: "Palm Resort", img: "/public/Images/re4.jpg", location: "Kerala, India", price: "₹10,800 / night", category: "Resort" },
  { name: "Royal Resort", img: "/public/Images/re5.jpg", location: "Jaipur, India", price: "₹13,500 / night", category: "Resort" },
  { name: "Spice Resort", img: "/public/Images/re6.jpg", location: "Chennai, India", price: "₹11,700 / night", category: "Resort" },
  { name: "The Grand Resort", img: "/public/Images/re7.jpg", location: "Hyderabad, India", price: "₹12,200 / night", category: "Resort" },
  { name: "Lakeview Resort", img: "/public/Images/re8.jpg", location: "Udaipur, India", price: "₹13,000 / night", category: "Resort" },
  { name: "Mountain Resort", img: "/public/Images/re9.jpg", location: "Manali, India", price: "₹10,900 / night", category: "Resort" },
  { name: "Pearl Resort", img: "/public/Images/re10.jpg", location: "Kolkata, India", price: "₹11,600 / night", category: "Resort" },
  { name: "Elite Resort", img: "/public/Images/re11.jpg", location: "Pune, India", price: "₹12,400 / night", category: "Resort" },
  { name: "Harbor Resort", img: "/public/Images/re12.jpg", location: "Kochi, India", price: "₹11,700 / night", category: "Resort" },
];

function getTrending(properties) {
  // 2 from each category (Hotel, Restaurant, Villa, Farm House, Waterpark, Resort)
  const cats = ["Hotel", "Restaurant", "Villa", "Farm House", "Waterpark", "Resort"];
  let trending = [];
  cats.forEach(cat => {
    trending = trending.concat(properties.filter(p => p.category === cat).slice(0, 2));
  });
  return trending;
}

function Booking() {
  const [selected, setSelected] = useState("Trending");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate();
  
  let displayProperties = [];
  if (selected === "Trending") {
    displayProperties = getTrending(allProperties);
  } else {
    displayProperties = allProperties.filter(p => p.category === selected).slice(0, 12);
  }

  const handleBookNow = () => {
    const user = localStorage.getItem('user');
    if (user) {
      // User is logged in, proceed to booking form
      navigate('/booking-form');
    } else {
      // User is not logged in, show auth modal
      setShowAuthModal(true);
    }
  };

  const handleAuthChoice = (choice) => {
    setShowAuthModal(false);
    if (choice === 'login') {
      navigate('/login');
    } else if (choice === 'signup') {
      navigate('/signup');
    }
  };

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center py-10 bg-black">
        {/* Icon Row */}
        <div className="w-full max-w-5xl mt-10 overflow-x-auto">
          <div className="flex flex-row items-end justify-center gap-8 py-6">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSelected(cat.name)}
                className={`flex flex-col items-center min-w-[80px] focus:outline-none transition-all ${selected === cat.name ? 'text-blue-400 font-bold' : 'text-gray-400'}`}
              >
                <div className={`mb-1 rounded-full p-2 ${selected === cat.name ? 'bg-blue-900/50' : 'bg-black/40'}`}>{cat.icon}</div>
                <span className="text-sm mt-1 whitespace-nowrap">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
        {/* Cards Grid */}
        <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 px-4 mt-10">
          {displayProperties.map((prop, idx) => (
            <div
              key={idx}
              className="rounded-3xl overflow-hidden shadow-lg border border-gray-800 bg-white/10 backdrop-blur-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            >
              {/* Image */}
              <div className="h-56 w-full bg-black overflow-hidden">
                <img src={prop.img} alt={prop.name} className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
              </div>

              {/* Content */}
              <div className="p-6 text-white flex flex-col justify-between">
                <h3 className="text-xl font-serif font-semibold text-center mb-2">{prop.name}</h3>
                <p className="text-sm text-gray-300 text-center">{prop.location}</p>

                {/* Price + Button Row */}
                <div className="flex items-center justify-between mt-4">
                  <span className="text-blue-400 font-semibold text-lg">{prop.price}</span>
                  <button
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-500 hover:from-purple-600 hover:to-pink-500 rounded-full text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all"
                    onClick={handleBookNow}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />

      {/* Authentication Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md mx-4 border border-white/20">
            <h3 className="text-2xl font-bold text-center mb-6 text-white">
              Sign In Required
            </h3>
            <p className="text-gray-300 text-center mb-6">
              Please sign in or create an account to proceed with your booking.
            </p>
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => handleAuthChoice('login')}
                className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105"
              >
                Login
              </button>
              <button
                onClick={() => handleAuthChoice('signup')}
                className="w-full py-3 px-4 rounded-lg border border-white text-white font-semibold hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105"
              >
                Sign Up
              </button>
              <button
                onClick={() => setShowAuthModal(false)}
                className="w-full py-2 px-4 rounded-lg text-gray-400 hover:text-white transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Booking;
