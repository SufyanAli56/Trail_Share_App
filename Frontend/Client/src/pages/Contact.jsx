import React from "react";

export default function Contact() {
  return (
    <div className="bg-gradient-to-b from-[#fef8f6] via-[#fcefe8] to-[#fef8f6]">
      {/* Hero Section */}
      <div
        className="relative w-full h-80 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1470&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Contact Us</h1>
          <p className="text-lg md:text-xl">
            We’d love to hear from you — let’s start the conversation.
          </p>
        </div>
      </div>

      {/* Contact Information */}
      <div className="max-w-5xl mx-auto py-12 px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition">
          <h3 className="text-2xl font-semibold text-red-600 mb-2">Email</h3>
          <p className="text-gray-700">support@travelsite.com</p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition">
          <h3 className="text-2xl font-semibold text-red-600 mb-2">Phone</h3>
          <p className="text-gray-700">+92 300 1234567</p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition">
          <h3 className="text-2xl font-semibold text-red-600 mb-2">Address</h3>
          <p className="text-gray-700">123 Main Street, Islamabad, Pakistan</p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="max-w-3xl mx-auto pb-16 px-6">
        <form className="bg-white shadow-lg rounded-xl p-8 space-y-6">
          <div>
            <label className="block text-left font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-400 outline-none"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-left font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-400 outline-none"
              placeholder="Your email"
            />
          </div>

          <div>
            <label className="block text-left font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              rows="5"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-400 outline-none"
              placeholder="Write your message..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
