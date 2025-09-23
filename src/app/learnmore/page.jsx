"use client";

import { useState, useEffect } from "react";

export default function LearnMorePage() {
  const [showSortingInfo, setShowSortingInfo] = useState(false);
  const [copiedAlgo, setCopiedAlgo] = useState("");

  const algorithms = [
    {
      name: "Bubble Sort",
      description:
        "Bubble Sort repeatedly compares adjacent elements and swaps them if they are in the wrong order. Simple but inefficient for large arrays.",
      time: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
      space: "O(1)",
      code: `function bubbleSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,
    },
    {
      name: "Insertion Sort",
      description:
        "Insertion Sort builds the sorted array one element at a time by placing each element into its correct position.",
      time: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
      space: "O(1)",
      code: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
    },
    {
      name: "Selection Sort",
      description:
        "Selection Sort repeatedly selects the smallest element from the unsorted part and swaps it with the first unsorted element.",
      time: { best: "O(n²)", average: "O(n²)", worst: "O(n²)" },
      space: "O(1)",
      code: `function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let minIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
  }
  return arr;
}`,
    },
    {
      name: "Quick Sort",
      description:
        "Quick Sort uses divide-and-conquer. It selects a pivot, partitions the array, and recursively sorts the subarrays.",
      time: { best: "O(n log n)", average: "O(n log n)", worst: "O(n²)" },
      space: "O(log n)",
      code: `function quickSort(arr) {
  if (arr.length <= 1) return arr;

  const pivot = arr[arr.length - 1];
  const left = [];
  const right = [];

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) left.push(arr[i]);
    else right.push(arr[i]);
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}`,
    },
    {
      name: "Merge Sort",
      description:
        "Merge Sort is a divide-and-conquer algorithm that splits the array into halves, recursively sorts them, and merges them back together.",
      time: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
      space: "O(n)",
      code: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  const merge = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) merge.push(left[i++]);
    else merge.push(right[j++]);
  }
  return [...merge, ...left.slice(i), ...right.slice(j)];
}`,
    },
    {
      name: "Heap Sort",
      description:
        "Heap Sort builds a max heap from the array and repeatedly extracts the maximum element to sort the array.",
      time: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
      space: "O(1)",
      code: `function heapSort(arr) {
  function heapify(arr, n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;

    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      heapify(arr, n, largest);
    }
  }

  const n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(arr, n, i);
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  return arr;
}`,
    },
    {
      name: "Counting Sort",
      description:
        "Counting Sort counts the occurrences of each element and places them directly into the sorted position. Works best for integers with small range.",
      time: { best: "O(n + k)", average: "O(n + k)", worst: "O(n + k)" },
      space: "O(n + k)",
      code: `function countingSort(arr) {
  const max = Math.max(...arr);
  const count = Array(max + 1).fill(0);

  for (const num of arr) count[num]++;
  const sorted = [];
  for (let i = 0; i < count.length; i++) {
    while (count[i]-- > 0) sorted.push(i);
  }
  return sorted;
}`,
    },
  ];

  const copyToClipboard = (algo) => {
    navigator.clipboard.writeText(algo.code).then(() => setCopiedAlgo(algo.name));
  };

  useEffect(() => {
    if (copiedAlgo) {
      const timer = setTimeout(() => setCopiedAlgo(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [copiedAlgo]);

  return (
    <div className="flex flex-col items-center justify-center px-4 py-12 bg-gray-900 text-gray-100 min-h-screen pt-36">
      <h1 className="text-4xl font-bold mb-6">AlgoFlow: Learn Sorting Algorithms</h1>
      <p className="text-gray-300 max-w-2xl mb-8 text-center">
        Learn about popular sorting algorithms, their complexities, and view their source code.
      </p>

      <button
        onClick={() => setShowSortingInfo(!showSortingInfo)}
        className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:bg-indigo-700 transition-all duration-300 mb-10"
      >
        {showSortingInfo ? "Hide Sorting Knowledge" : "Learn More"}
      </button>

      {showSortingInfo && (
        <div className="w-full max-w-5xl space-y-10 mt-8">
          {algorithms.map((algo, idx) => (
            <div
              key={idx}
              className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700"
            >
              <h2 className="text-2xl font-bold text-indigo-400 mb-3">{algo.name}</h2>
              <p className="text-gray-300 mb-2">{algo.description}</p>
              <p className="text-gray-300 mb-2">
                <span className="font-semibold text-white">Time Complexity:</span>{" "}
                Best: {algo.time.best}, Average: {algo.time.average}, Worst: {algo.time.worst}
              </p>
              <p className="text-gray-300 mb-4">
                <span className="font-semibold text-white">Space Complexity:</span> {algo.space}
              </p>

              <button
                onClick={() => copyToClipboard(algo)}
                className="mb-4 bg-indigo-500 text-white px-4 py-2 rounded shadow hover:bg-indigo-600 transition duration-300"
              >
                Copy Code
              </button>

              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{algo.code}</code>
              </pre>
            </div>
          ))}
        </div>
      )}

      {copiedAlgo && (
        <div className="fixed bottom-6 right-6 bg-indigo-600 text-white px-5 py-3 rounded shadow-lg animate-fadeInOut">
          {copiedAlgo} code copied!
        </div>
      )}

      <style jsx>{`
        .animate-fadeInOut {
          animation: fadeInOut 2s forwards;
        }
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateY(10px); }
          10% { opacity: 1; transform: translateY(0); }
          90% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(10px); }
        }
      `}</style>
    </div>
  );
}
