"use client";
import SimpleDotPattern from "@/components/magicui/DotPattern"



import Link from "next/link";


export default function ContactPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start bg-white text-black p-8 sm:p-16">
      
      {/* Dotted Background */}
      <SimpleDotPattern />

      {/* Spacer to push content below fixed navbar */}
      <div className="h-28"></div>

      <h1 className="text-5xl font-bold mb-12 relative z-10">Contact Us</h1>

      <p className="text-lg max-w-3xl mb-8 relative z-10">
        Have questions or want to collaborate? Feel free to reach out via email or connect on social media.
      </p>

      <p className="text-lg mb-6 relative z-10">
        Email: <span className="font-semibold">anirvedpanda1818@gmail.com</span>
      </p>

      <div className="flex gap-6 mb-12 relative z-10">
        <Link href="https://github.com/anirved18" target="_blank" className="text-blue-600 font-semibold hover:underline">
          GitHub
        </Link>
        <Link href="https://www.linkedin.com/in/anirved-panda-917639299/" target="_blank" className="text-blue-600 font-semibold hover:underline">
          LinkedIn
        </Link>
      </div>

      {/* Contact Form */}
      <form className="w-full max-w-lg flex flex-col gap-6 relative z-10">
        <input
          type="text"
          placeholder="Your Name"
          className="border border-gray-300 rounded-xl p-4 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-black"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="border border-gray-300 rounded-xl p-4 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-black"
        />
        <textarea
          placeholder="Your Message"
          rows={6}
          className="border border-gray-300 rounded-xl p-4 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all resize-none text-black"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold py-4 rounded-xl shadow-lg hover:bg-blue-700 transition-all duration-300"
        >
          Send Message
        </button>
      </form>

    </div>
  );
}
