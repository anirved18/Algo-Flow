import InsertionSort from "@/components/Algorithms/insertionsort";

export default function InsertionSortPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50">
      <h1 className="text-5xl sm:text-6xl font-bold mb-6 text-black mt-[100px]">
        Bubble Sort Visualizer
      </h1>
      <p className="text-lg sm:text-xl mb-8 text-black text-center max-w-xl">
        Watch how Bubble Sort works step by step with animated bars.
      </p>
      <InsertionSort />
    </div>
  );
}
