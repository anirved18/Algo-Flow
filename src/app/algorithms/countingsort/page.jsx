"use client";

import { useState, useEffect } from "react";

export default function CountingSort() {
  const [numBars, setNumBars] = useState(20);
  const [speed, setSpeed] = useState(10);
  const [array, setArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [activeIndices, setActiveIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);

  const maxContainerHeight = 400;

  const generateArray = (n) =>
    Array.from({ length: n }, () => Math.floor(Math.random() * 50) + 1); // keep numbers small for counting sort

  useEffect(() => {
    if (!isSorting) {
      setArray(generateArray(numBars));
      setSortedIndices([]);
      setCurrentIndex(null);
      setActiveIndices([]);
    }
  }, [numBars]);

  const handleRandomize = () => {
    if (!isSorting) {
      setArray(generateArray(numBars));
      setSortedIndices([]);
      setCurrentIndex(null);
      setActiveIndices([]);
    }
  };

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const countingSort = async (arr) => {
    const n = arr.length;
    const maxVal = Math.max(...arr);
    const count = Array(maxVal + 1).fill(0);
    const output = Array(n).fill(0);

    // Count occurrences
    for (let i = 0; i < n; i++) {
      setCurrentIndex(i);
      setActiveIndices([i]);
      await sleep(210 - speed * 10);
      count[arr[i]]++;
    }

    // Accumulate counts
    for (let i = 1; i <= maxVal; i++) {
      count[i] += count[i - 1];
      setActiveIndices([i]); // highlight count array index
      await sleep(210 - speed * 10);
    }

    // Place elements into output array
    for (let i = n - 1; i >= 0; i--) {
      const val = arr[i];
      const pos = count[val] - 1;
      output[pos] = val;
      count[val]--;
      setActiveIndices([i, pos]);
      setArray([...output]);
      await sleep(210 - speed * 10);
    }

    // Mark all as sorted
    setSortedIndices([...Array(n).keys()]);
  };

  const handleVisualize = async () => {
    if (isSorting) return;
    setIsSorting(true);
    setSortedIndices([]);
    const arr = [...array];
    await countingSort(arr);
    setIsSorting(false);
    setCurrentIndex(null);
    setActiveIndices([]);
  };

  const maxValue = Math.max(...array);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-900 px-4 pt-36 text-gray-100">
      <h1 className="text-4xl font-extrabold mb-2 text-white">
        Counting Sort Visualizer
      </h1>
      <p className="mb-8 text-lg text-gray-300">
        Watch the sorting process step by step with counts and placements.
      </p>

      {/* Controls */}
      <div className="mb-6 w-full max-w-4xl space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between sm:space-x-6 space-y-4 sm:space-y-0">
          <div className="flex-1 w-full">
            <label className="block text-center font-bold text-white text-lg mb-2">
              Number of Bars: {numBars}
            </label>
            <input
              type="range"
              min="10"
              max="50"
              value={numBars}
              onChange={(e) => setNumBars(Number(e.target.value))}
              disabled={isSorting}
              className={`w-full h-3 rounded-lg appearance-none cursor-pointer accent-indigo-500 ${
                isSorting ? "opacity-50 cursor-not-allowed" : "bg-gray-700"
              }`}
            />
          </div>

          <div className="flex-1 w-full">
            <label className="block text-center font-bold text-white text-lg mb-2">
              Speed: {speed}
            </label>
            <input
              type="range"
              min="1"
              max="20"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              disabled={isSorting}
              className={`w-full h-3 rounded-lg appearance-none cursor-pointer accent-indigo-500 ${
                isSorting ? "opacity-50 cursor-not-allowed" : "bg-gray-700"
              }`}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-6 space-y-4 sm:space-y-0">
          <button
            onClick={handleVisualize}
            disabled={isSorting}
            className="bg-indigo-600 text-white font-bold px-8 py-3 rounded-xl shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSorting ? "Sorting..." : "Visualize"}
          </button>

          <button
            onClick={handleRandomize}
            disabled={isSorting}
            className="bg-gray-800 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Randomize
          </button>
        </div>
      </div>

      {/* Bars */}
      <div className="flex items-end justify-center space-x-1 h-[450px] w-full max-w-6xl border p-2 rounded-lg bg-gray-800">
        {array.map((num, idx) => {
          let bgColor = "bg-gray-500 shadow-lg"; // default

          if (sortedIndices.includes(idx)) bgColor = "bg-green-500 shadow-lg"; // sorted
          else if (currentIndex === idx) bgColor = "bg-red-500 shadow-lg"; // currently processing
          else if (activeIndices.includes(idx)) bgColor = "bg-purple-500 shadow-lg"; // placing/active

          return (
            <div
              key={idx}
              className={`${bgColor} rounded-t-lg transition-all transform hover:scale-y-105`}
              style={{
                height: `${(num / maxValue) * maxContainerHeight}px`,
                width: `${800 / numBars}px`,
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
}
