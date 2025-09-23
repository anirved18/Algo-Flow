"use client";
import React from "react";

export default function AnimatedBars() {
  const bars = Array.from({ length: 40 });
  const baseHeight = 60;

  // Professional color palette
  const colors = ["#3B82F6", "#06B6D4", "#8B5CF6"]; // blue, cyan, violet

  return (
    <div
      className="flex items-end justify-center gap-1 h-64 w-full"
      role="progressbar"
      aria-label="Loading animation"
    >
      {bars.map((_, index) => {
        const color1 = colors[index % colors.length];
        const color2 = colors[(index + 1) % colors.length];

        return (
          <div
            key={index}
            className="w-3 rounded-lg shadow-lg origin-bottom"
            style={{
              height: `${baseHeight + Math.random() * 60}px`,
              background: `linear-gradient(to top, ${color1}, ${color2})`,
              animation: `pulse 1.5s ease-in-out ${index * 0.08}s infinite alternate`,
            }}
          ></div>
        );
      })}

      {/* Global CSS keyframes */}
      <style>
        {`
          @keyframes pulse {
            0% {
              transform: scaleY(0.5);
              opacity: 0.7;
            }
            50% {
              transform: scaleY(1.3);
              opacity: 1;
            }
            100% {
              transform: scaleY(0.5);
              opacity: 0.7;
            }
          }
        `}
      </style>
    </div>
  );
}
