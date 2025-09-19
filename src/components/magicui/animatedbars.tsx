"use client";

import React from "react";

export default function AnimatedBars() {
  const bars = Array.from({ length: 40 });
  const heights = Array.from({ length: 40 }, (_, i) => 60 + i * 4); // fixed heights for smooth wave

  return (
    <div className="flex items-end justify-center gap-2 h-64">
      {bars.map((_, index) => (
        <div
          key={index}
          className="w-4 bg-blue-600 rounded-full"
          style={{
            height: `${heights[index]}px`,
            animation: `wave 1.5s ease-in-out ${index * 0.1}s infinite alternate`,
          }}
        ></div>
      ))}

      <style jsx>{`
        @keyframes wave {
          0% { transform: scaleY(0.5); }
          50% { transform: scaleY(1.2); }
          100% { transform: scaleY(0.5); }
        }
      `}</style>
    </div>
  );
}
