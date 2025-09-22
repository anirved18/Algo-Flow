"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";

interface NavLink {
  name: string;
  path?: string;
  dropdown?: { name: string; path: string }[];
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Static links array to prevent hydration errors
  const navLinks: NavLink[] = [
    { name: "Home", path: "/" },
    {
      name: "Algorithms",
      dropdown: [
        { name: "Bubble Sort", path: "/algorithms/bubblesort" },
        { name: "Insertion Sort", path: "/algorithms/insertionsort" },
        { name: "Selection Sort", path: "/algorithms/selectionsort" },
        { name: "Quick Sort", path: "/algorithms/quicksort" },
      ],
    },
    { name: "Sorting", path: "/sorting" },
    { name: "About", path: "/aboutme" },
    { name: "Contact", path: "/contactus" },
  ];

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <nav className="w-full fixed top-4 z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center bg-white/95 backdrop-blur-md shadow-2xl rounded-full px-10 py-6">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/asserts/logo.jpg"
              alt="AlgoFlow Logo"
              width={48}
              height={48}
              className="mr-3"
              priority
            />
            <span className="text-black font-extrabold text-3xl">AlgoFlow</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-10 items-center relative">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.name} className="relative group">
                  <button
                    onClick={() => toggleDropdown(link.name)}
                    className="flex items-center text-black hover:text-blue-600 font-semibold text-lg transition-colors duration-300"
                  >
                    {link.name}
                    <ChevronDown
                      className={`ml-1 w-4 h-4 transition-transform duration-300 ${
                        openDropdown === link.name ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown */}
                  <div
                    className={`absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 origin-top ${
                      openDropdown === link.name
                        ? "opacity-100 scale-100 visible"
                        : "opacity-0 scale-95 invisible"
                    }`}
                  >
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.name}
                        href={item.path}
                        className="block px-6 py-3 text-black font-medium hover:bg-gradient-to-r hover:from-blue-400 hover:to-indigo-500 hover:text-white transition-all rounded-lg"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.name}
                  href={link.path!}
                  className="text-black hover:text-blue-600 font-semibold text-lg transition-colors duration-300"
                >
                  {link.name}
                </Link>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-black focus:outline-none">
              {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 bg-white/95 backdrop-blur-md shadow-xl rounded-2xl">
            <div className="px-6 py-6 space-y-3">
              {navLinks.map((link) =>
                link.dropdown ? (
                  <div key={link.name}>
                    <button
                      onClick={() => toggleDropdown(link.name)}
                      className="w-full flex justify-between items-center px-4 py-3 text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      {link.name}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          openDropdown === link.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openDropdown === link.name &&
                      link.dropdown.map((item) => (
                        <Link
                          key={item.name}
                          href={item.path}
                          className="block px-6 py-2 text-black hover:bg-gray-200 rounded-lg transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                  </div>
                ) : (
                  <Link
                    key={link.name}
                    href={link.path!}
                    className="block text-black font-semibold px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors"
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
