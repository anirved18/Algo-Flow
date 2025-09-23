"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Compare", path: "/compare" }, // Compare link
    { name: "Learn More", path: "/learnmore" }, // Learn More link
    {
      name: "Algorithms",
      dropdown: [
        { name: "Bubble Sort", path: "/algorithms/bubblesort" },
        { name: "Insertion Sort", path: "/algorithms/insertionsort" },
        { name: "Selection Sort", path: "/algorithms/selectionsort" },
        { name: "Quick Sort", path: "/algorithms/quicksort" },
        { name: "Merge Sort", path: "/algorithms/mergesort" },
        { name: "Heap Sort", path: "/algorithms/heapsort" },
        { name: "Counting Sort", path: "/algorithms/countingsort" },
      ],
    },
    { name: "About", path: "/aboutme" },
    { name: "Contact", path: "/contactus" },
  ];

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md top-0" : "bg-transparent top-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center rounded-full px-6 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <img
              src="/asserts/algooo.png"
              alt="AlgoFlow Logo"
              className="w-10 h-10 object-cover"
            />
            <span
              className={`font-extrabold text-2xl sm:text-3xl ${
                scrolled ? "text-gray-900" : "text-white"
              }`}
            >
              AlgoFlow
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.name} className="relative group">
                  <button
                    className={`flex items-center font-medium text-lg transition-colors ${
                      scrolled ? "text-gray-900" : "text-white"
                    } hover:text-blue-600`}
                  >
                    {link.name}
                    <ChevronDown className="ml-1 w-4 h-4 group-hover:rotate-180 transition-transform" />
                  </button>
                  {/* Dropdown */}
                  <div className="absolute top-full left-0 mt-3 w-56 rounded-xl shadow-xl border border-gray-200 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 origin-top bg-gradient-to-b from-blue-50 to-white">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.name}
                        href={item.path}
                        className="flex items-center px-5 py-3 text-gray-800 font-medium transition-all rounded-lg hover:bg-blue-500 hover:text-white"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`relative font-medium text-lg transition-colors ${
                    scrolled ? "text-gray-900" : "text-white"
                  } hover:text-blue-600`}
                >
                  {link.name}
                </Link>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={scrolled ? "text-gray-900" : "text-white"}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-2 bg-gradient-to-b from-blue-50 to-white shadow-lg rounded-xl border border-gray-200">
            <div className="px-6 py-4 space-y-2">
              {navLinks.map((link) =>
                link.dropdown ? (
                  <div key={link.name}>
                    <button
                      onClick={() => toggleDropdown(link.name)}
                      className="w-full flex justify-between items-center px-4 py-3 text-gray-800 font-semibold rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      {link.name}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          openDropdown === link.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openDropdown === link.name && (
                      <div className="pl-2 space-y-1 mt-2 border-l border-gray-200">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.name}
                            href={item.path}
                            className="block px-4 py-2 text-gray-700 hover:bg-blue-500 hover:text-white rounded-md transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.name}
                    href={link.path}
                    className="block text-gray-800 font-medium px-4 py-3 rounded-lg hover:bg-blue-100 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
