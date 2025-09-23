import React from "react";

export default function ContactPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start bg-gray-900 text-gray-100 p-8 sm:p-16">
      {/* Spacer to push content below fixed navbar */}
      <div className="h-28"></div>

      <h1 className="text-5xl font-bold mb-12 relative z-10 text-white">
        Contact Us
      </h1>

      <p className="text-lg max-w-3xl mb-8 relative z-10 text-gray-300">
        Have questions or want to collaborate? Feel free to reach out via email or connect on social media.
      </p>

      <p className="text-lg mb-6 relative z-10 text-gray-300">
        Email:{" "}
        <span className="font-semibold text-white">
          anirvedpanda1818@gmail.com
        </span>
      </p>

      <div className="flex gap-6 mb-12 relative z-10">
        <a
          href="https://github.com/anirved18"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-400 font-semibold hover:underline"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/anirved-panda-917639299/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-400 font-semibold hover:underline"
        >
          LinkedIn
        </a>
      </div>

      {/* Contact Form */}
      <form className="w-full max-w-lg flex flex-col gap-6 relative z-10">
        <input
          type="text"
          placeholder="Your Name"
          className="border border-gray-700 bg-gray-800 rounded-xl p-4 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-white placeholder-gray-400"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="border border-gray-700 bg-gray-800 rounded-xl p-4 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-white placeholder-gray-400"
        />
        <textarea
          placeholder="Your Message"
          rows={6}
          className="border border-gray-700 bg-gray-800 rounded-xl p-4 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none text-white placeholder-gray-400"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white font-semibold py-4 rounded-xl shadow-lg hover:bg-indigo-700 transition-all duration-300"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
