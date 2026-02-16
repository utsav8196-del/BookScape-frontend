import React from "react";
import {
  FaFacebookF,
  FaTwitter, 
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-black border-t border-gray-500 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div>
          <h3 className="text-2xl font-bold text-blue-500 mb-4">BookScape</h3>
          <p className="text-gray-400">
            Your perfect getaway is just a click away. Discover luxury villas,
            peaceful farmhouses, and premium resorts with ease.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">Explore</a></li>
            <li><a href="#" className="hover:text-white">Login</a></li>
            <li><a href="#" className="hover:text-white">Sign Up</a></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Categories</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white">Villa</a></li>
            <li><a href="#" className="hover:text-white">Farmhouse</a></li>
            <li><a href="#" className="hover:text-white">Resort</a></li>
            <li><a href="#" className="hover:text-white">Hotel</a></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Follow Us</h4>
          <div className="flex space-x-4 mt-2 text-gray-400">
            <a href="#" className="hover:text-blue-400">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-blue-400">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-pink-500">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-blue-600">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      <div className="border-gray-700 text-center py-6 text-gray-500 text-sm">
        © {new Date().getFullYear()} BookScape. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
