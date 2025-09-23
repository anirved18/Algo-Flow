"use client";
import React, { useState, useEffect } from "react";

// Sorting algorithms with animation logic
const sortingAlgorithms = {
  "Bubble Sort": {
    time: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
    space: "O(1)",
    sort: async (arr, setArray, speed, setComparing, setSorted) => {
      let array = [...arr];
      let n = array.length;
      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
          setComparing([j, j + 1]);
          await new Promise((r) => setTimeout(r, speed));
          if (array[j] > array[j + 1]) {
            [array[j], array[j + 1]] = [array[j + 1], array[j]];
            setArray([...array]);
          }
        }
        setSorted([...Array(i + 1).keys()]);
      }
      setSorted([...Array(n).keys()]);
      setComparing([]);
      setArray([...array]);
    },
  },
  "Insertion Sort": {
    time: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
    space: "O(1)",
    sort: async (arr, setArray, speed, setComparing, setSorted) => {
      let array = [...arr];
      let sorted = [];
      for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
          setComparing([j, j + 1]);
          await new Promise((r) => setTimeout(r, speed));
          array[j + 1] = array[j];
          j--;
          setArray([...array]);
        }
        array[j + 1] = key;
        sorted.push(i);
        setSorted([...sorted]);
      }
      setSorted([...Array(array.length).keys()]);
      setComparing([]);
      setArray([...array]);
    },
  },
  "Selection Sort": {
    time: { best: "O(n²)", average: "O(n²)", worst: "O(n²)" },
    space: "O(1)",
    sort: async (arr, setArray, speed, setComparing, setSorted) => {
      let array = [...arr];
      let sorted = [];
      for (let i = 0; i < array.length; i++) {
        let minIdx = i;
        for (let j = i + 1; j < array.length; j++) {
          setComparing([minIdx, j]);
          await new Promise((r) => setTimeout(r, speed));
          if (array[j] < array[minIdx]) minIdx = j;
        }
        [array[i], array[minIdx]] = [array[minIdx], array[i]];
        sorted.push(i);
        setSorted([...sorted]);
        setArray([...array]);
      }
      setComparing([]);
      setArray([...array]);
    },
  },
  "Quick Sort": {
    time: { best: "O(n log n)", average: "O(n log n)", worst: "O(n²)" },
    space: "O(log n)",
    sort: async (arr, setArray, speed, setComparing, setSorted) => {
      let array = [...arr];
      let sorted = [];
      const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

      const partition = async (low, high) => {
        let pivot = array[high];
        let i = low - 1;
        for (let j = low; j < high; j++) {
          setComparing([j, high]);
          await sleep(speed);
          if (array[j] < pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];
            setArray([...array]);
            await sleep(speed);
          }
        }
        [array[i + 1], array[high]] = [array[high], array[i + 1]];
        setArray([...array]);
        return i + 1;
      };

      const quickSort = async (low, high) => {
        if (low < high) {
          let pi = await partition(low, high);
          sorted.push(pi);
          setSorted([...sorted]);
          await quickSort(low, pi - 1);
          await quickSort(pi + 1, high);
        }
      };

      await quickSort(0, array.length - 1);
      setSorted([...Array(array.length).keys()]);
      setComparing([]);
      setArray([...array]);
    },
  },
  "Merge Sort": {
    time: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
    space: "O(n)",
    sort: async (arr, setArray, speed, setComparing, setSorted) => {
      let array = [...arr];
      let sorted = [];
      const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

      const merge = async (l, m, r) => {
        let n1 = m - l + 1;
        let n2 = r - m;
        let L = array.slice(l, m + 1);
        let R = array.slice(m + 1, r + 1);
        let i = 0,
          j = 0,
          k = l;
        while (i < n1 && j < n2) {
          setComparing([k]);
          await sleep(speed);
          if (L[i] <= R[j]) {
            array[k] = L[i];
            i++;
          } else {
            array[k] = R[j];
            j++;
          }
          setArray([...array]);
          k++;
        }
        while (i < n1) {
          array[k] = L[i];
          i++;
          k++;
          setArray([...array]);
          await sleep(speed);
        }
        while (j < n2) {
          array[k] = R[j];
          j++;
          k++;
          setArray([...array]);
          await sleep(speed);
        }
      };

      const mergeSort = async (l, r) => {
        if (l < r) {
          let m = Math.floor((l + r) / 2);
          await mergeSort(l, m);
          await mergeSort(m + 1, r);
          await merge(l, m, r);
        }
      };

      await mergeSort(0, array.length - 1);
      setSorted([...Array(array.length).keys()]);
      setComparing([]);
      setArray([...array]);
    },
  },
  "Heap Sort": {
    time: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
    space: "O(1)",
    sort: async (arr, setArray, speed, setComparing, setSorted) => {
      let array = [...arr];
      let sorted = [];
      const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

      const heapify = async (n, i) => {
        let largest = i;
        let l = 2 * i + 1;
        let r = 2 * i + 2;
        if (l < n && array[l] > array[largest]) largest = l;
        if (r < n && array[r] > array[largest]) largest = r;
        if (largest !== i) {
          setComparing([i, largest]);
          await sleep(speed);
          [array[i], array[largest]] = [array[largest], array[i]];
          setArray([...array]);
          await heapify(n, largest);
        }
      };

      let n = array.length;
      for (let i = Math.floor(n / 2) - 1; i >= 0; i--) await heapify(n, i);
      for (let i = n - 1; i >= 0; i--) {
        [array[0], array[i]] = [array[i], array[0]];
        sorted.push(i);
        setSorted([...sorted]);
        setArray([...array]);
        await heapify(i, 0);
      }
      setSorted([...Array(array.length).keys()]);
      setComparing([]);
      setArray([...array]);
    },
  },
  "Counting Sort": {
    time: { best: "O(n+k)", average: "O(n+k)", worst: "O(n+k)" },
    space: "O(k)",
    sort: async (arr, setArray, speed, setComparing, setSorted) => {
      let array = [...arr];
      let sorted = [];
      const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
      let max = Math.max(...array);
      let count = Array(max + 1).fill(0);
      for (let i = 0; i < array.length; i++) {
        count[array[i]]++;
        setComparing([i]);
        await sleep(speed);
      }
      let index = 0;
      for (let i = 0; i < count.length; i++) {
        while (count[i]-- > 0) {
          array[index] = i;
          sorted.push(index);
          setSorted([...sorted]);
          setArray([...array]);
          await sleep(speed);
          index++;
        }
      }
      setSorted([...Array(array.length).keys()]);
      setComparing([]);
      setArray([...array]);
    },
  },
};

export default function ExplorePage() {
  const [algo1, setAlgo1] = useState("Bubble Sort");
  const [algo2, setAlgo2] = useState("Insertion Sort");
  const [size, setSize] = useState(20);
  const [speed, setSpeed] = useState(50);

  const [array1, setArray1] = useState([]);
  const [array2, setArray2] = useState([]);
  const [comparing1, setComparing1] = useState([]);
  const [comparing2, setComparing2] = useState([]);
  const [sorted1, setSorted1] = useState([]);
  const [sorted2, setSorted2] = useState([]);
  const [isSorting, setIsSorting] = useState(false);

  const generateArrays = () => {
    const arr = Array.from({ length: size }, () =>
      Math.floor(Math.random() * 100 + 5)
    );
    setArray1([...arr]);
    setArray2([...arr]);
    setSorted1([]);
    setSorted2([]);
    setComparing1([]);
    setComparing2([]);
  };

  useEffect(() => {
    generateArrays();
  }, [size]);

  const startComparison = async () => {
    setIsSorting(true);
    const adjustedSpeed = 101 - speed; // Lower slider = slower
    await Promise.all([
      sortingAlgorithms[algo1]?.sort(array1, setArray1, adjustedSpeed, setComparing1, setSorted1),
      sortingAlgorithms[algo2]?.sort(array2, setArray2, adjustedSpeed, setComparing2, setSorted2),
    ]);
    setIsSorting(false);
  };

  const barWidth = Math.max(8, 500 / size);
  const barGap = Math.max(2, 500 / (size * 10));
  const containerHeight = 350;
  const getScaleFactor = (array) => containerHeight / Math.max(...array, 1);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-6 pt-28">
      <h1 className="text-4xl font-bold mb-10 text-indigo-400 text-center">
        Sorting Comparison Visualizer
      </h1>

      {/* Algorithm selectors */}
      <div className="flex flex-col sm:flex-row gap-6 mb-6 w-full max-w-4xl justify-center">
        <div>
          <label className="block mb-1 font-semibold">Algorithm 1</label>
          <select
            value={algo1}
            onChange={(e) => setAlgo1(e.target.value)}
            className="p-2 rounded bg-gray-800 border border-gray-700"
          >
            {Object.keys(sortingAlgorithms).map((algo) => (
              <option key={algo} value={algo}>{algo}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-semibold">Algorithm 2</label>
          <select
            value={algo2}
            onChange={(e) => setAlgo2(e.target.value)}
            className="p-2 rounded bg-gray-800 border border-gray-700"
          >
            {Object.keys(sortingAlgorithms).map((algo) => (
              <option key={algo} value={algo}>{algo}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Sliders */}
      <div className="flex flex-col sm:flex-row gap-6 mb-6 w-full max-w-4xl justify-center">
        <div className="flex flex-col flex-1">
          <label className="mb-1 font-semibold">Array Size: {size}</label>
          <input
            type="range"
            min="5"
            max="50"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <div className="flex flex-col flex-1">
          <label className="mb-1 font-semibold">Speed: {speed}</label>
          <input
            type="range"
            min="1"
            max="100"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-6 mb-10">
        <button
          onClick={generateArrays}
          disabled={isSorting}
          className="bg-indigo-600 px-6 py-2 rounded hover:bg-indigo-700 transition"
        >
          Randomize
        </button>
        <button
          onClick={startComparison}
          disabled={isSorting}
          className="bg-green-600 px-6 py-2 rounded hover:bg-green-700 transition"
        >
          Start Comparison
        </button>
      </div>

      {/* Visualization */}
      <div className="flex flex-col sm:flex-row gap-12 mb-12 w-full max-w-6xl justify-center">
        {[array1, array2].map((arr, idx) => {
          const algo = idx === 0 ? algo1 : algo2;
          const comparing = idx === 0 ? comparing1 : comparing2;
          const sorted = idx === 0 ? sorted1 : sorted2;
          return (
            <div key={idx} className="flex flex-col items-center w-full">
              <h2 className="text-xl font-bold mb-4">{algo}</h2>
              <div
                className="flex items-end gap-1 w-full justify-center"
                style={{ height: `${containerHeight}px` }}
              >
                {arr.map((value, i) => (
                  <div
                    key={i}
                    style={{
                      height: `${value * getScaleFactor(arr)}px`,
                      width: `${barWidth}px`,
                      marginRight: `${barGap}px`,
                    }}
                    className={`${
                      comparing.includes(i)
                        ? "bg-red-500"
                        : sorted.includes(i)
                        ? "bg-green-500"
                        : "bg-gray-500"
                    } transition-all duration-150`}
                  ></div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Complexity Info */}
      <div className="flex flex-col sm:flex-row gap-12 w-full max-w-6xl justify-center">
        {[algo1, algo2].map((algo, idx) => (
          <div key={idx}>
            {sortingAlgorithms[algo] ? (
              <>
                <p>
                  <span className="font-semibold">{algo} Time Complexity:</span>{" "}
                  Best: {sortingAlgorithms[algo].time.best}, Average:{" "}
                  {sortingAlgorithms[algo].time.average}, Worst:{" "}
                  {sortingAlgorithms[algo].time.worst}
                </p>
                <p>
                  <span className="font-semibold">{algo} Space Complexity:</span>{" "}
                  {sortingAlgorithms[algo].space}
                </p>
              </>
            ) : (
              <p>Algorithm not found</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
