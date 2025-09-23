"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import background from "@/components/magicui/background";
import AnimatedBars from "@/components/magicui/animatedbars";
import { motion } from "framer-motion";

export default function HomePage() {
  const fullText =
    "Master algorithms effortlessly with interactive visualizations, turning complex concepts into engaging learning experiences.";
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(fullText.slice(0, index + 1));
      index++;
      if (index === fullText.length) clearInterval(interval);
    }, 15);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-900 overflow-hidden text-gray-100">
      {/* Background Dots */}
      <background />

      {/* Hero Section */}
      <div className="text-center relative z-10 max-w-3xl px-4 sm:px-16">
        {/* Title */}
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-6xl sm:text-7xl font-extrabold mb-6 text-white"
        >
          Algorithm Visualizer
        </motion.h1>

        {/* Animated Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1.5 }}
          className="text-lg sm:text-xl mb-12 text-gray-300 min-h-[80px]"
        >
          {displayedText}
        </motion.p>

        {/* Mini Sorting Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="mb-12"
        >
          <AnimatedBars />
        </motion.div>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            href="/algo"
            className="relative inline-block font-semibold py-4 px-10 rounded-2xl text-white text-lg shadow-lg border-2 border-transparent transition-all duration-300 transform hover:scale-105 hover:shadow-xl bg-gray-800"
          >
            Explore Visualizer
          </Link>

          <Link
            href="#features"
            className="inline-block font-semibold py-4 px-10 rounded-2xl text-gray-100 border-2 border-gray-600 bg-gray-900 shadow hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}
