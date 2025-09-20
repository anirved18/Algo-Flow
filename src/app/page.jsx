"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import SimpleDotPattern from "@/components/magicui/DotPattern";
import AnimatedBars from "@/components/magicui/animatedbars";

export default function HomePage() {
  const fullText =
    "Master algorithms effortlessly with interactive step-by-step visualizations, turning complex concepts into clear, engaging learning experiences.";
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(fullText.slice(0, index + 1));
      index++;
      if (index === fullText.length) clearInterval(interval);
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-white text-black p-8 sm:p-16">
      {/* Dotted Background */}
      <SimpleDotPattern />

      {/* Hero Content */}
      <div className="text-center relative z-10 max-w-3xl">
        <h1 className="text-6xl sm:text-7xl font-bold mb-6">
          Algorithm Visualizer
        </h1>

        {/* Animated Description */}
        <p className="text-lg sm:text-xl mb-12 text-gray-700 min-h-[80px]">
          {displayedText}
        </p>

        {/* Animated Bars */}
        <div className="mb-12">
          <AnimatedBars />
        </div>

        {/* Stylish Call-to-action Button */}
        <Link
          href="/algo"
          className="inline-block font-semibold py-4 px-10 rounded-2xl text-white text-lg shadow-lg border-2 border-transparent transition-all duration-300 transform hover:scale-105 hover:shadow-xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 animate-glow-border"
        >
          Check It Out
        </Link>

        {/* Glowing border animation */}
        <style jsx>{`
          @keyframes glowBorder {
            0%,
            100% {
              border-color: rgba(255, 255, 255, 0.3);
              box-shadow: 0 0 10px rgba(59, 130, 246, 0.5),
                0 0 20px rgba(59, 130, 246, 0.3);
            }
            50% {
              border-color: rgba(255, 255, 255, 1);
              box-shadow: 0 0 25px rgba(59, 130, 246, 1),
                0 0 50px rgba(59, 130, 246, 0.7);
            }
          }

          .animate-glow-border {
            animation: glowBorder 1s infinite alternate;
          }
        `}</style>
      </div>
    </div>
  );
}
