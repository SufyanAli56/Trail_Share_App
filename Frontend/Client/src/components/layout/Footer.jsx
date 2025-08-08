import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaPinterest,
  FaYoutube,
} from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-teal-800 to-emerald-900 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* About Section */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <span className="bg-white text-emerald-700 px-3 py-1 rounded-lg mr-2">
                Tarvil
              </span>
              Travels
            </h3>
            <p className="text-emerald-100 mb-4 leading-relaxed">
              Discover the world with Tarvil. We specialize in creating
              unforgettable travel experiences that connect you with diverse
              cultures, breathtaking landscapes, and authentic adventures. Our
              mission is to make travel accessible, sustainable, and
              transformative.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-teal-700 hover:bg-teal-600 p-2 rounded-full transition-all duration-300"
              >
                <FaFacebook className="text-xl" />
              </a>
              <a
                href="#"
                className="bg-teal-700 hover:bg-teal-600 p-2 rounded-full transition-all duration-300"
              >
                <FaTwitter className="text-xl" />
              </a>
              <a
                href="#"
                className="bg-teal-700 hover:bg-teal-600 p-2 rounded-full transition-all duration-300"
              >
                <FaInstagram className="text-xl" />
              </a>
              <a
                href="#"
                className="bg-teal-700 hover:bg-teal-600 p-2 rounded-full transition-all duration-300"
              >
                <FaPinterest className="text-xl" />
              </a>
              <a
                href="#"
                className="bg-teal-700 hover:bg-teal-600 p-2 rounded-full transition-all duration-300"
              >
                <FaYoutube className="text-xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-teal-500">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-emerald-100 hover:text-white transition-colors duration-300 flex items-center"
                >
                  <span className="w-2 h-2 bg-teal-400 rounded-full mr-2"></span>
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-emerald-100 hover:text-white transition-colors duration-300 flex items-center"
                >
                  <span className="w-2 h-2 bg-teal-400 rounded-full mr-2"></span>
                  Destinations
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-emerald-100 hover:text-white transition-colors duration-300 flex items-center"
                >
                  <span className="w-2 h-2 bg-teal-400 rounded-full mr-2"></span>
                  Tour Packages
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-emerald-100 hover:text-white transition-colors duration-300 flex items-center"
                >
                  <span className="w-2 h-2 bg-teal-400 rounded-full mr-2"></span>
                  Adventure Tours
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-emerald-100 hover:text-white transition-colors duration-300 flex items-center"
                >
                  <span className="w-2 h-2 bg-teal-400 rounded-full mr-2"></span>
                  Special Offers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-emerald-100 hover:text-white transition-colors duration-300 flex items-center"
                >
                  <span className="w-2 h-2 bg-teal-400 rounded-full mr-2"></span>
                  Travel Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-teal-500">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MdLocationOn className="text-teal-400 text-xl mt-1 mr-3 flex-shrink-0" />
                <span className="text-emerald-100">
                  123 Adventure Avenue
                  <br />
                  Travel City, TC 10001
                </span>
              </li>
              <li className="flex items-center">
                <MdPhone className="text-teal-400 text-xl mr-3" />
                <span className="text-emerald-100">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <MdEmail className="text-teal-400 text-xl mr-3" />
                <a
                  href="mailto:info@tarvil-travels.com"
                  className="text-emerald-100 hover:text-white transition-colors duration-300"
                >
                  info@tarvil-travels.com
                </a>
              </li>
            </ul>

            <div className="mt-6">
              <h4 className="text-lg font-medium mb-2">Business Hours</h4>
              <p className="text-emerald-100">
                Monday - Friday: 9am - 6pm
                <br />
                Saturday: 10am - 4pm
                <br />
                Sunday: Closed
              </p>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-teal-500">
              Newsletter
            </h3>
            <p className="text-emerald-100 mb-4">
              Subscribe to our newsletter for travel tips, exclusive deals, and
              destination inspiration.
            </p>
            <form className="space-y-3">
              <div>
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-2 rounded-lg bg-teal-800 border border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 text-white placeholder-emerald-200"
                />
              </div>
              <button
                type="submit"
                className="w-full relative overflow-hidden rounded-lg font-medium text-white transition-all duration-300 transform hover:-translate-y-1 shadow-lg py-2.5 px-5"
                style={{
                  background: "linear-gradient(to left, #ff4d4d, #b30000)",
                  boxShadow: "0 4px 15px rgba(255, 77, 77, 0.4)",
                }}
              >
                <span className="relative z-10">Subscribe</span>
                <span className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
              </button>
            </form>

            <div className="mt-6">
  <h4 className="text-lg font-medium mb-2">Payment Methods</h4>
  <div className="flex space-x-2">
    <div className="bg-white p-2 rounded-md">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
        alt="Visa"
        className="h-6 w-auto"
      />
    </div>
    <div className="bg-white p-2 rounded-md">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
        alt="MasterCard"
        className="h-6 w-auto"
      />
    </div>
    <div className="bg-white p-2 rounded-md">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
        alt="PayPal"
        className="h-6 w-auto"
      />
    </div>
    <div className="bg-white p-2 rounded-md">
  <img
    src="https://1000logos.net/wp-content/uploads/2020/06/Apple-Pay-logo.png"
    alt="Apple Pay"
    className="h-6 w-auto object-contain"
  />
</div>

  </div>
</div>

          </div>
        </div>

        {/* Copyright and Legal */}
        <div className="border-t border-teal-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-emerald-200 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Tarvil Travels. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a
                href="/privacy"
                className="text-emerald-200 hover:text-white transition-colors duration-300 text-sm"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-emerald-200 hover:text-white transition-colors duration-300 text-sm"
              >
                Terms of Service
              </a>
              <a
                href="/cookies"
                className="text-emerald-200 hover:text-white transition-colors duration-300 text-sm"
              >
                Cookie Policy
              </a>
              <a
                href="/sitemap"
                className="text-emerald-200 hover:text-white transition-colors duration-300 text-sm"
              >
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
    </footer>
  );
};

export default Footer;
