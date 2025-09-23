"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AnimatedBars from "@/components/magicui/animatedbars";
import { motion } from "framer-motion";

export default function HomePage() {
  const fullText =
    "Master algorithms effortlessly with interactive visualizations, turning complex concepts into engaging learning experiences.";
  const [displayedText, setDisplayedText] = useState("");

  const algorithms = [
    { name: "Bubble Sort", path: "/algorithms/bubblesort" },
    { name: "Insertion Sort", path: "/algorithms/insertionsort" },
    { name: "Selection Sort", path: "/algorithms/selectionsort" },
    { name: "Quick Sort", path: "/algorithms/quicksort" },
    { name: "Merge Sort", path: "/algorithms/MergeSort" },
    { name: "Heap Sort", path: "/algorithms/heapsort" },
    { name: "Counting Sort", path: "/algorithms/countingsort" },
  ];

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
      
      {/* Hero Section */}
      <div className="text-center relative z-10 max-w-3xl px-4 sm:px-16">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-6xl sm:text-7xl font-extrabold mb-6 text-white"
        >
          Algorithm Visualizer
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1.5 }}
          className="text-lg sm:text-xl mb-12 text-gray-300 min-h-[80px]"
        >
          {displayedText}
        </motion.p>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="mb-12"
        >
          <AnimatedBars />
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
          <Link
            href="/compare"
            className="relative inline-block font-semibold py-4 px-10 rounded-2xl text-white text-lg shadow-lg border-2 border-transparent transition-all duration-300 transform hover:scale-105 hover:shadow-xl bg-gray-800"
          >
            Compare Sorting Algorithms
          </Link>

          <Link
            href="/learnmore"
            className="inline-block font-semibold py-4 px-10 rounded-2xl text-gray-100 border-2 border-gray-600 bg-gray-900 shadow hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
          >
            Learn More
          </Link>
        </div>

       {/* Algorithm Links Section */}
<div className="flex flex-wrap justify-center gap-4 w-full max-w-6xl mt-8">
  {algorithms.map((algo) => (
    <Link
      key={algo.name}
      href={algo.path}
      className="bg-gray-800 hover:bg-indigo-600 text-white py-3 px-6 rounded-xl font-semibold shadow transition-all duration-300 transform hover:scale-105"
    >
      {algo.name}
    </Link>
  ))}
</div>

      </div>
    </div>
  );
}
