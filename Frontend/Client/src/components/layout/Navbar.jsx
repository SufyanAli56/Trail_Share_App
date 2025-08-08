import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  // Modern travel-themed color palette
  const colors = {
    primary: '#4C6FFF',    // Vibrant royal blue
    secondary: '#F8FAFC',  // Almost white
    accent: '#FFB74D',     // Modern warm orange
    dark: '#1A202C',       // Deep charcoal
    light: '#E2E8F0',      // Soft gray
    error: '#F56565',      // Coral red
    success: '#48BB78'     // Mint green
  };

  // Navigation links
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Destinations', path: '/destinations' },
    { name: 'Packages', path: '/packages' },
    { name: 'Experiences', path: '/experiences' },
    { name: 'Contact', path: '/contact' },
    { name: 'About', path: '/about' },
  ];

  // Check if link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <nav 
        className="w-full fixed top-0 z-50 transition-all duration-300"
        style={{
          background: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          borderBottom: '1px solid rgba(226, 232, 240, 0.5)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-600 opacity-75 blur"></div>
                  <div 
                    className="relative px-4 py-2 rounded-lg text-white font-bold text-xl tracking-wide"
                    style={{ background: 'linear-gradient(135deg, #4C6FFF 0%, #3B5BDB 100%)' }}
                  >
                    WanderLuxe
                  </div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-4 py-2 font-medium text-lg rounded-lg transition-all duration-300 ${
                    isActive(link.path) 
                      ? 'text-blue-600 font-semibold' 
                      : 'text-gray-600 hover:text-blue-500'
                  }`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <span 
                      className="absolute bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 w-6 rounded-full"
                      style={{ background: 'linear-gradient(90deg, #FFB74D 0%, #FF9800 100%)' }}
                    ></span>
                  )}
                </Link>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3">
              <Link 
                to="/login"
                className="hidden md:block relative px-5 py-2.5 rounded-lg font-medium text-white transition-all duration-300 overflow-hidden"
                style={{
                  background: 'linear-gradient(90deg, #FFB74D 0%, #FF9800 100%)',
                  boxShadow: '0 4px 15px rgba(255, 183, 77, 0.4)'
                }}
              >
                <span className="relative z-10">Login</span>
                <span className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
              
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg"
                style={{ background: 'linear-gradient(135deg, #4C6FFF 0%, #3B5BDB 100%)' }}
              >
                <span 
                  className={`block w-6 h-0.5 bg-white rounded mb-1 transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}
                ></span>
                <span 
                  className={`block w-6 h-0.5 bg-white rounded mb-1 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}
                ></span>
                <span 
                  className={`block w-6 h-0.5 bg-white rounded transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}
                ></span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isMenuOpen ? 'max-h-96 opacity-100 py-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block px-4 py-3 rounded-xl text-lg font-medium transition-colors duration-300 ${
                  isActive(link.path) 
                    ? 'text-blue-600 bg-blue-50 font-semibold' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            <Link 
              to="/login"
              className="block mt-4 px-4 py-3 rounded-xl text-center text-white font-medium text-lg"
              style={{
                background: 'linear-gradient(90deg, #FFB74D 0%, #FF9800 100%)',
                boxShadow: '0 4px 15px rgba(255, 183, 77, 0.4)'
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;