"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, Mountain, MapPin } from "lucide-react";
import ImageCursor from '../components/layout/ImageCursorTrail';
import MapSection from "../components/layout/MapSection";
import Img from '../assets/Noor.jpg';
import Faq from "../components/common/Faq";

// Try to import Hiking normally or use Mountain as fallback
let HikingIcon = Mountain;
try {
  const { Hiking } = require("lucide-react");
  HikingIcon = Hiking;
} catch (e) {
  console.warn("Hiking icon not available, using fallback");
}

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background gradient and visual elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8f5f2] via-[#f2e8e5] to-[#f8f5f2]"></div>
        <div className="absolute top-20 right-10 w-24 h-24 rounded-full bg-red-500/10 blur-3xl"></div>
        <div className="absolute bottom-40 left-10 w-32 h-32 rounded-full bg-amber-500/10 blur-3xl"></div>
      </div>

      {/* Main content container */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left column - text content */}
          <div className="w-full md:w-1/2 mb-12 md:mb-0">
            <div className="inline-flex items-center mb-5 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-red-200 shadow-sm">
              <Sparkles className="mr-2 h-5 w-5 fill-red-500 stroke-red-500" />
              <span className="text-red-800 font-medium">Find Your Next Adventure</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 mb-6">
              Discover <span className="text-red-600">Breathtaking</span> Trails <br className="hidden lg:block" />
              <span className="bg-gradient-to-r from-amber-700 via-red-700 to-amber-700 bg-clip-text text-transparent">
                Around The World
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-700 max-w-lg mb-8 leading-relaxed">
              Plan unforgettable journeys, share your travel stories, and connect with fellow explorers on TrailShare. 
              Your next great adventure starts here.
            </p>

            {/* Call to actions */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/trails"
                className="group flex items-center gap-3 px-7 py-4 rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
              >
                <span>Start Exploring</span>
                <HikingIcon className="h-5 w-5 group-hover:animate-bounce" />
              </Link>
              <Link
                to="/about"
                className="flex items-center gap-3 px-7 py-4 rounded-xl bg-white text-red-700 font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] border border-red-200 transition-all duration-300"
              >
                <MapPin className="h-5 w-5" />
                <span>How It Works</span>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex mt-10 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-700">10K+</div>
                <div className="text-gray-600">Trails</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-700">500K+</div>
                <div className="text-gray-600">Explorers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-700">100+</div>
                <div className="text-gray-600">Countries</div>
              </div>
            </div>
          </div>

          {/* Right column - image with floating cards */}
          <div className="w-full md:w-1/2 relative">
            <div className="relative">
              {/* Dashboard-style image box */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img src={Img} alt="Adventure preview" className="w-full h-96 object-cover" />
              </div>

              {/* Floating card 1 */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-lg p-4 w-48 border border-red-100">
                <div className="flex items-center mb-2">
                  <div className="bg-red-100 p-2 rounded-full mr-2">
                    <Mountain className="h-5 w-5 text-red-700" />
                  </div>
                  <div className="font-bold text-gray-800">Mountain Trails</div>
                </div>
                <div className="text-sm text-gray-600">Discover challenging alpine routes with breathtaking views</div>
              </div>

              {/* Floating card 2 */}
              <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-lg p-4 w-48 border border-amber-100">
                <div className="flex items-center mb-2">
                  <div className="bg-amber-100 p-2 rounded-full mr-2">
                    <MapPin className="h-5 w-5 text-amber-700" />
                  </div>
                  <div className="font-bold text-gray-800">Hidden Gems</div>
                </div>
                <div className="text-sm text-gray-600">Explore lesser-known paths recommended by our community</div>
              </div>
            </div>
          </div>
        </div>

        {/* Cursor and map components */}
        <ImageCursor />
        <MapSection />
        <Faq/>
      </div>
    </div>
  );
}
