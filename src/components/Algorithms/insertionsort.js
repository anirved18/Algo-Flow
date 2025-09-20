"use client";

import { useState, useEffect } from "react";

export default function InsertionSort() {
  const [numBars, setNumBars] = useState(20);
  const [array, setArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [currentCompare, setCurrentCompare] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);
  const speed = 25; // fixed speed

  const maxContainerHeight = 400;

  // Generate random array
  const generateArray = (n) => {
    return Array.from({ length: n }, () => Math.floor(Math.random() * 100) + 10);
  };

  // Initialize array
  useEffect(() => {
    setArray(generateArray(numBars));
  }, [numBars]);

  // Randomize array
  const handleRandomize = () => {
    if (!isSorting) {
      setArray(generateArray(numBars));
      setCurrentCompare([]);
      setSortedIndices([]);
    }
  };

  // Insertion Sort Visualization
  const handleVisualize = async () => {
    if (isSorting) return;
    setIsSorting(true);
    const arr = [...array];
    const sorted = [];

    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;

      while (j >= 0 && arr[j] > key) {
        setCurrentCompare([j, j + 1]); // highlight both bars
        await new Promise((r) => setTimeout(r, speed));

        arr[j + 1] = arr[j];
        setArray([...arr]);
        await new Promise((r) => setTimeout(r, speed));
        j--;
      }

      arr[j + 1] = key;
      setArray([...arr]);
      sorted.push(i);
      setSortedIndices([...sorted]);
      setCurrentCompare([]);
    }

    setSortedIndices([...Array(arr.length).keys()]);
    setCurrentCompare([]);
    setIsSorting(false);
  };

  const maxValue = Math.max(...array);

  return (
    <div className="flex flex-col items-center w-full px-4 sm:px-8 mt-[100px]">
      {/* Controls */}
      <div className="mb-6 flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-6 w-full max-w-4xl">
        {/* Number of Bars */}
        <div className="flex flex-col items-center w-56">
          <label className="font-bold text-black text-lg mb-1">
            Number of Bars: {numBars}
          </label>
          <input
            type="range"
            min="10"
            max="100"
            value={numBars}
            onChange={(e) => {
              const val = Number(e.target.value);
              setNumBars(val);
              setArray(generateArray(val));
              setSortedIndices([]);
              setCurrentCompare([]);
            }}
            disabled={isSorting}
            className="w-full h-3 bg-gray-300 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Randomize Button */}
        <button
          onClick={handleRandomize}
          disabled={isSorting}
          className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold px-6 py-2 rounded-xl shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl animate-bounce disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Randomize
        </button>
      </div>

      {/* Visualize Button */}
      <button
        onClick={handleVisualize}
        disabled={isSorting}
        className="mb-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold px-8 py-3 rounded-xl shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl animate-pulse disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSorting ? "Sorting..." : "Visualize"}
      </button>

      {/* Bars */}
      <div
        className="grid gap-1 items-end w-full"
        style={{
          gridTemplateColumns: `repeat(${numBars}, 1fr)`,
          maxWidth: "1000px",
          height: `${maxContainerHeight}px`,
        }}
      >
        {array.map((num, idx) => {
          let bgColor = "bg-blue-700"; // default unsorted
          if (sortedIndices.includes(idx)) bgColor = "bg-green-600"; // sorted
          else if (currentCompare.includes(idx)) bgColor = "bg-red-500"; // comparing

          return (
            <div
              key={idx}
              className={`${bgColor} rounded-b transition-all duration-200`}
              style={{ height: `${(num / maxValue) * maxContainerHeight}px` }}
            ></div>
          );
        })}
      </div>
    </div>
  );
}
