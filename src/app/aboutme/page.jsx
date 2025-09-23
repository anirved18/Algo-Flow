"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-gray-900 flex flex-col items-center justify-start p-8 sm:p-16 text-gray-100">
      {/* Custom Background Component */}

      {/* Spacer to push content below fixed navbar */}
      <div className="h-28"></div>

      {/* Page Title */}
      <h1 className="text-5xl font-bold text-white mb-12 relative z-10">
        About Me
      </h1>

      {/* About Me Section */}
      <p className="text-lg text-gray-300 max-w-3xl mb-12 relative z-10">
        Hi, I’m <span className="font-semibold text-white">Anirved Panda</span>, a passionate Computer Science student and aspiring full-stack developer. 
        I enjoy building applications that solve real-world problems while blending clean design with powerful functionality.
      </p>

      {/* Experience Section */}
      <h2 className="text-2xl font-bold text-indigo-400 mb-6 relative z-10">Experience</h2>
      <p className="text-gray-300 max-w-3xl mb-12 relative z-10">
        Built projects like <span className="font-semibold text-white">RAG Based AI-Assistent</span>, <span className="font-semibold text-white">AlgoFlow</span> (Algorithm Visualizer), and more.
      </p>

      {/* Skills Section */}
      <h2 className="text-2xl font-bold text-indigo-400 mb-6 relative z-10">Skills</h2>
      <p className="text-gray-300 max-w-3xl mb-12 relative z-10">
        Java, JavaScript, Node.js, Express, MongoDB, React, Tailwind CSS, and exploring system-level concepts like CS fundamentals, algorithms, and more.
      </p>

      {/* Contact Section */}
      <h2 className="text-2xl font-bold text-indigo-400 mb-6 relative z-10">Contact</h2>
      <p className="text-gray-300 mb-6 relative z-10">
        Email: <span className="font-semibold text-white">anirvedpanda1818@gmail.com</span>
      </p>

      {/* Links */}
      <div className="flex gap-6 mb-12 relative z-10">
        <Link
          href="https://github.com/anirved18"
          target="_blank"
          className="text-indigo-400 font-semibold hover:underline"
        >
          GitHub
        </Link>
        <Link
          href="https://www.linkedin.com/in/anirved-panda-917639299/"
          target="_blank"
          className="text-indigo-400 font-semibold hover:underline"
        >
          LinkedIn
        </Link>
      </div>
    </div>
  );
}
