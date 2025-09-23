"use client";

import { useState, useEffect } from "react";

export default function MergeSort() {
  const [numBars, setNumBars] = useState(20);
  const [speed, setSpeed] = useState(10);
  const [array, setArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [currentCompare, setCurrentCompare] = useState([]);
  const [activeIndices, setActiveIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);

  const maxContainerHeight = 400;

  const generateArray = (n) =>
    Array.from({ length: n }, () => Math.floor(Math.random() * 100) + 10);

  useEffect(() => {
    if (!isSorting) {
      setArray(generateArray(numBars));
      setSortedIndices([]);
      setCurrentCompare([]);
      setActiveIndices([]);
    }
  }, [numBars]);

  const handleRandomize = () => {
    if (!isSorting) {
      setArray(generateArray(numBars));
      setSortedIndices([]);
      setCurrentCompare([]);
      setActiveIndices([]);
    }
  };

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const mergeSort = async (arr, l, r) => {
    if (l >= r) return;
    const m = Math.floor((l + r) / 2);
    await mergeSort(arr, l, m);
    await mergeSort(arr, m + 1, r);
    await merge(arr, l, m, r);
  };

  const merge = async (arr, l, m, r) => {
    let left = arr.slice(l, m + 1);
    let right = arr.slice(m + 1, r + 1);
    let i = 0,
      j = 0,
      k = l;

    while (i < left.length && j < right.length) {
      const leftIndex = l + i;
      const rightIndex = m + 1 + j;

      // Highlight comparison
      setCurrentCompare([leftIndex, rightIndex]);
      setActiveIndices([leftIndex, rightIndex]);
      await sleep(210 - speed * 10);

      if (left[i] <= right[j]) {
        arr[k] = left[i];
        i++;
      } else {
        arr[k] = right[j];
        j++;
      }
      setArray([...arr]);
      k++;
    }

    while (i < left.length) {
      const leftIndex = l + i;
      setActiveIndices([leftIndex]);
      arr[k] = left[i];
      setArray([...arr]);
      await sleep(210 - speed * 10);
      i++;
      k++;
    }

    while (j < right.length) {
      const rightIndex = m + 1 + j;
      setActiveIndices([rightIndex]);
      arr[k] = right[j];
      setArray([...arr]);
      await sleep(210 - speed * 10);
      j++;
      k++;
    }

    // After merging this segment, mark all bars in this segment as sorted if they are in their final position
    for (let index = l; index <= r; index++) {
      setSortedIndices((prev) => [...prev, index]);
      await sleep(10); // small delay to animate green color gradually
    }

    setCurrentCompare([]);
    setActiveIndices([]);
  };

  const handleVisualize = async () => {
    if (isSorting) return;
    setIsSorting(true);
    const arr = [...array];
    setSortedIndices([]);
    await mergeSort(arr, 0, arr.length - 1);
    setIsSorting(false);
    setCurrentCompare([]);
    setActiveIndices([]);
  };

  const maxValue = Math.max(...array);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-900 px-4 pt-36 text-gray-100">
      <h1 className="text-4xl font-extrabold mb-2 text-white">
        Merge Sort Visualizer
      </h1>
      <p className="mb-8 text-lg text-gray-300">
        Watch the sorting process step by step with comparisons and merges.
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
              max="100"
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

          if (sortedIndices.includes(idx))
            bgColor = "bg-green-500 shadow-lg"; // finally sorted
          else if (currentCompare.includes(idx))
            bgColor = "bg-red-500 shadow-lg"; // comparing
          else if (activeIndices.includes(idx))
            bgColor = "bg-yellow-400 shadow-lg"; // currently active/merging

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
