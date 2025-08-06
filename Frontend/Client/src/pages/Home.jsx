"use client";

import React from "react";
import { Link } from "react-router-dom";
import { SparklesIcon, Plane, MapPin } from "lucide-react";
import ImageCursorTrail from '../components/layout/ImageCursorTrail'
import MapSection from "../components/layout/MapSection";
export default function Home() {
  return (
  <>
    <div className="relative min-h-screen bg-gradient-to-b from-blue-50 via-white to-pink-50 flex flex-col items-center justify-center overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-100 rounded-full mix-blend-multiply opacity-20 blur-xl" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-pink-100 rounded-full mix-blend-multiply opacity-20 blur-xl" />
      </div>

      {/* Main content */}
      <section className="relative mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto flex w-full flex-col items-center justify-center rounded-[32px] border border-black/5 bg-white/30 backdrop-blur-md shadow-xl p-10 md:p-16">
          <article className="flex flex-col items-center justify-center text-center">
            {/* Badge replacement */}
            <div className="mb-4 rounded-[14px] border border-black/10 bg-white/70 backdrop-blur-sm text-base px-4 py-1 inline-flex items-center">
              <SparklesIcon className="mr-2 h-5 w-5 fill-pink-300 stroke-1 text-neutral-800" />
              <span>Discover the World</span>
            </div>
            
            <h1 className="max-w-2xl text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900">
              Welcome to <span className="text-blue-600">TravelSite</span>
            </h1>
            
            <p className="mt-3 max-w-xl text-gray-600 text-lg sm:text-xl">
              Discover amazing trips and bookmark your favorites.
            </p>

            {/* Call to Actions */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/trips"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
              >
                <Plane className="h-5 w-5" />
                Start Exploring
              </Link>
              <Link
                to="/about"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-blue-600 font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] border border-blue-100 transition-all duration-200"
              >
                <MapPin className="h-5 w-5" />
                Learn More
              </Link>
            </div>
          </article>
        </div>
      </section>
     
    </div>
     <ImageCursorTrail/>
     <MapSection/>
  </>
  );
}