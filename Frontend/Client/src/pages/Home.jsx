"use client";

import React from "react";
import { Link } from "react-router-dom";
import { SparklesIcon, Plane, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import ImageCursorTrail from "../ui/image-cursortrail";

const images = [
  "https://images.pexels.com/photos/30082445/pexels-photo-30082445.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.unsplash.com/photo-1692606743169-e1ae2f0a960f?q=80&w=3560&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1709949908058-a08659bfa922?q=80&w=1200&auto=format",
  "https://images.unsplash.com/photo-1548192746-dd526f154ed9?q=80&w=1200&auto=format",
  "https://images.unsplash.com/photo-1644141655284-2961181d5a02?q=80&w=3000&auto=format&fit=crop",
  "https://assets.lummi.ai/assets/QmNfwUDpehZyLWzE8to7QzgbJ164S6fQy8JyUWemHtmShj?auto=format&w=1500",
  "https://images.unsplash.com/photo-1706049379414-437ec3a54e93?q=80&w=1200&auto=format",
  "https://assets.lummi.ai/assets/Qmb2P6tF2qUaFXnXpnnp2sk9HdVHNYXUv6MtoiSq7jjVhQ?auto=format&w=1500",
  "https://images.unsplash.com/photo-1508873881324-c92a3fc536ba?q=80&w=1200&auto=format",
];

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-50 via-white to-pink-50 flex flex-col items-center justify-center overflow-hidden">
      {/* Hero Section with Cursor Trail */}
      <section className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto flex w-full flex-col items-center justify-center rounded-[32px] border border-black/5 bg-white/30 backdrop-blur-md shadow-xl p-10 md:p-16">
          <ImageCursorTrail
            items={images}
            maxNumberOfImages={6}
            distance={30}
            imgClass="sm:w-44 w-28 sm:h-52 h-36 object-cover rounded-xl shadow-lg"
            className="w-full rounded-3xl"
          >
            <article className="relative z-50 flex flex-col items-center justify-center text-center">
              <Badge
                variant="outline"
                className="mb-4 rounded-[14px] border border-black/10 bg-white/70 backdrop-blur-sm text-base px-4 py-1"
              >
                <SparklesIcon className="mr-2 h-5 w-5 fill-pink-300 stroke-1 text-neutral-800" />
                Discover the World
              </Badge>
              <h1 className="max-w-2xl text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900">
                Welcome to{" "}
                <span className="text-blue-600">TravelSite</span>
              </h1>
              <p className="mt-3 max-w-xl text-gray-600 text-lg sm:text-xl">
                Explore breathtaking destinations and bookmark your dream trips. Adventure is just a click away.
              </p>

              {/* Call to Actions */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/trips"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-200"
                >
                  <Plane className="h-5 w-5" />
                  Start Exploring
                </Link>
                <Link
                  to="/about"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-blue-600 font-semibold shadow-md hover:bg-blue-50 hover:shadow-lg border border-blue-100 transition-all duration-200"
                >
                  <MapPin className="h-5 w-5" />
                  Learn More
                </Link>
              </div>
            </article>
          </ImageCursorTrail>
        </div>
      </section>
    </div>
  );
}
