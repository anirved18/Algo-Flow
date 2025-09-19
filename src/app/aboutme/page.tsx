"use client";

import Link from "next/link";
import SimpleDotPattern from "@/components/magicui/DotPattern"

export default function AboutPage() {
  return (
     
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start p-8 sm:p-16">
       <SimpleDotPattern/>
      {/* Spacer to push content below fixed navbar */}
      <div className="h-28"></div>

      {/* Page Title */}
      <h1 className="text-5xl font-bold text-black mb-12">About Me</h1>
      
      {/* About Me Section */}
      <p className="text-lg text-gray-700 max-w-3xl mb-12">
        Hi, I’m <span className="font-semibold">Anirved Panda</span>, a passionate Computer Science student and aspiring full-stack developer. 
        I enjoy building applications that solve real-world problems while blending clean design with powerful functionality.
      </p>

      {/* Experience Section */}
      <h2 className="text-2xl font-bold text-black mb-6">Experience</h2>
      <p className="text-gray-700 max-w-3xl mb-12">
        Built projects like <span className="font-semibold">RAG Based AI-Assistent</span>, <span className="font-semibold">AlgoFlow</span> (Algorithm Visualizer), and more.
      </p>

      {/* Skills Section */}
      <h2 className="text-2xl font-bold text-black mb-6">Skills</h2>
      <p className="text-gray-700 max-w-3xl mb-12">
        Java, JavaScript, Node.js, Express, MongoDB, React, Tailwind CSS, and exploring system-level concepts like CS fundamentals, algorithms, and more.
      </p>

      {/* Contact Section */}
      <h2 className="text-2xl font-bold text-black mb-6">Contact</h2>
      <p className="text-gray-700 mb-6">
        Email: <span className="font-semibold">anirvedpanda1818@gmail.com</span>
      </p>

      {/* Links */}
      <div className="flex gap-6 mb-12 relative z-10">
        <Link href="https://github.com/anirved18" target="_blank" className="text-blue-600 font-semibold hover:underline">
          GitHub
        </Link>
        <Link href="https://www.linkedin.com/in/anirved-panda-917639299/" target="_blank" className="text-blue-600 font-semibold hover:underline">
          LinkedIn
        </Link>
      </div>

    </div>
  );
}
