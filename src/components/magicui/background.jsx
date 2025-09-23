"use client";

export default function background() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Layer 1: static dots */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(200,200,200,0.3) 1px,transparent 1px)] [background-size:25px_25px]" />

      {/* Layer 2: subtle animated moving dots */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(100,149,237,0.2) 2px,transparent 2px)] [background-size:50px_50px] animate-dotMove" />

      <style jsx>{`
        @keyframes dotMove {
          0% {
            background-position: 0 0;
          }
          50% {
            background-position: 25px 25px;
          }
          100% {
            background-position: 0 0;
          }
        }
        .animate-dotMove {
          animation: dotMove 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
