import { Menu, X, User, LogOut } from "lucide-react"; // You can use any icon library
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const profileRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Check if user is logged in on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Handle clicking outside profile dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Helper to determine if a link is active
  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setShowProfileMenu(false);
    navigate('/');
  };

  return (
    <nav className="bg-black shadow-md fixed w-full z-10 top-0 left-0">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 text-2xl font-bold text-blue-600">
            <Link to="/">
              <img src="/BookScape.png" alt="Logo" className="h-13 w-40 inline-block mr-2" />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <div className="space-x-6">
              <Link to="/" className={`text-white hover:text-blue-500 transition${isActive("/") ? " text-blue-500 underline underline-offset-4 decoration-2 decoration-white" : ""}`}>Home</Link>
              <Link to="/about" className={`text-white hover:text-blue-500 transition${isActive("/about") ? " text-blue-500 underline underline-offset-4 decoration-2 decoration-white" : ""}`}>About</Link>
              <Link to="/contact" className={`text-white hover:text-blue-500 transition${isActive("/contact") ? " text-blue-500 underline underline-offset-4 decoration-2 decoration-white" : ""}`}>Contact</Link>
              <Link to="/booking" className={`text-white hover:text-blue-500 transition${isActive("/booking") ? " text-blue-500 underline underline-offset-4 decoration-2 decoration-white" : ""}`}>Booking</Link>
            </div>
            <div className="space-x-3 ml-6">
              {user ? (
                // Profile Icon when logged in
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center space-x-2 text-white hover:text-blue-500 transition p-2 rounded-lg hover:bg-white/10"
                  >
                    <User className="w-6 h-6" />
                    <span className="text-sm">{user.name}</span>
                  </button>
                  
                  {/* Profile Dropdown Menu */}
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white/10 backdrop-blur-lg rounded-lg shadow-xl border border-white/20 py-2">
                      <div className="px-4 py-2 text-sm text-gray-300 border-b border-white/10">
                        <div className="font-medium">{user.name}</div>
                        <div className="text-xs">{user.email}</div>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-2 text-sm text-white hover:bg-white/10 transition"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                // Login/Signup buttons when not logged in
                <>
                  <button 
                    onClick={() => navigate('/login')}
                    className="px-4 py-1 border border-white text-white rounded hover:bg-white hover:text-black transition"
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => navigate('/signup')}
                    className="px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded hover:from-purple-500 hover:to-pink-500 transition"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/95 px-4 py-2 space-y-2 shadow-md">
          <Link to="/" className={`block text-white hover:text-blue-500 py-2${isActive("/") ? " text-blue-500 underline underline-offset-4 decoration-2 decoration-white" : ""}`}>Home</Link>
          <Link to="/about" className={`block text-white hover:text-blue-500 py-2${isActive("/about") ? " text-blue-500 underline underline-offset-4 decoration-2 decoration-white" : ""}`}>About</Link>
          <Link to="/contact" className={`block text-white hover:text-blue-500 py-2${isActive("/contact") ? " text-blue-500 underline underline-offset-4 decoration-2 decoration-white" : ""}`}>Contact</Link>
          <Link to="/booking" className={`block text-white hover:text-blue-500 py-2${isActive("/booking") ? " text-blue-500 underline underline-offset-4 decoration-2 decoration-white" : ""}`}>Booking</Link>
          <div className="pt-2 pb-3 border-t border-gray-700">
            {user ? (
              // Mobile profile section when logged in
              <div className="space-y-2">
                <div className="px-4 py-2 text-sm text-gray-300 border-b border-white/10">
                  <div className="font-medium">{user.name}</div>
                  <div className="text-xs">{user.email}</div>
                </div>
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center px-4 py-2 text-white border border-white rounded hover:bg-white hover:text-black transition"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            ) : (
              // Mobile login/signup buttons when not logged in
              <>
                <button 
                  onClick={() => {
                    navigate('/login');
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-2 text-white border border-white rounded hover:bg-white hover:text-black transition mb-2"
                >
                  Login
                </button>
                <button 
                  onClick={() => {
                    navigate('/signup');
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded hover:from-purple-500 hover:to-pink-500 transition"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;