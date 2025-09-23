"use client";

import { useState, useEffect } from "react";

export default function QuickSort() {
  const [numBars, setNumBars] = useState(20);
  const [speed, setSpeed] = useState(10);
  const [array, setArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [currentCompare, setCurrentCompare] = useState([]);
  const [pivotIndex, setPivotIndex] = useState(null);
  const [sortedIndices, setSortedIndices] = useState([]);

  const maxContainerHeight = 400;

  const generateArray = (n) =>
    Array.from({ length: n }, () => Math.floor(Math.random() * 100) + 10);

  useEffect(() => {
    if (!isSorting) {
      setArray(generateArray(numBars));
      setSortedIndices([]);
      setCurrentCompare([]);
      setPivotIndex(null);
    }
  }, [numBars]);

  const handleRandomize = () => {
    if (!isSorting) {
      setArray(generateArray(numBars));
      setSortedIndices([]);
      setCurrentCompare([]);
      setPivotIndex(null);
    }
  };

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const quickSort = async (arr, low, high) => {
    if (low < high) {
      const pi = await partition(arr, low, high);
      await quickSort(arr, low, pi - 1);
      await quickSort(arr, pi + 1, high);
    } else if (low === high) {
      setSortedIndices((prev) => [...prev, low]);
    }
  };

  const partition = async (arr, low, high) => {
    const pivot = arr[high];
    setPivotIndex(high);

    let i = low - 1;
    for (let j = low; j < high; j++) {
      setCurrentCompare([j, high]);
      await sleep(210 - speed * 10);

      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
        await sleep(210 - speed * 10);
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setArray([...arr]);
    await sleep(210 - speed * 10);

    setPivotIndex(null);
    setCurrentCompare([]);
    setSortedIndices((prev) => [...prev, i + 1]);

    return i + 1;
  };

  const handleVisualize = async () => {
    if (isSorting) return;
    setIsSorting(true);
    const arr = [...array];
    await quickSort(arr, 0, arr.length - 1);
    setSortedIndices([...Array(arr.length).keys()]);
    setIsSorting(false);
  };

  const maxValue = Math.max(...array);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-900 px-4 pt-36 text-gray-100">
      <h1 className="text-4xl font-extrabold mb-2 text-white">
        Quick Sort Visualizer
      </h1>
      <p className="mb-8 text-lg text-gray-300">
        Watch the sorting process step by step with pivot, comparisons, and swaps.
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
            bgColor = "bg-green-500 shadow-lg"; // sorted
          else if (currentCompare.includes(idx))
            bgColor = "bg-red-500 shadow-lg"; // comparing
          else if (idx === pivotIndex)
            bgColor = "bg-indigo-500 shadow-lg"; // pivot

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
