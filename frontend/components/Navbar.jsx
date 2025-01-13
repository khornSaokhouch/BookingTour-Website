'use client';

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faBriefcase } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from 'next/image'; // Import Image from next/image

export default function Header () {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      {/* Navbar Section */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto flex justify-between items-center py-4 px-4 md:px-20">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/logo.png" // Ensure this image is in the public folder
              alt="Logo"
              width={100} // Adjust width as needed
              height={40} // Adjust height as needed
              className="object-cover"
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>

          {/* Navigation Links - Visible on Full Screen Only */}
          <nav className="hidden md:flex space-x-10 text-gray-700 font-medium text-lg px-20">
            <Link href="/" className="hover:text-blue-500">
              Home
            </Link>
            <Link href="/services" className="hover:text-blue-500">
              Services
            </Link>
            <Link href="/attractions" className="hover:text-blue-500">
              Attractions
            </Link>
          </nav>

          {/* Right Section: Favourites + Become Supplier + Sign in */}
          <div className="hidden md:flex items-center space-x-6 ml-auto text-lg">
            <Link
              href="#"
              className="text-gray-700 hover:text-blue-500 flex items-center space-x-2"
            >
              <FontAwesomeIcon icon={faHeart} className="text-lg" />
              <span>Favourites</span>
            </Link>
            <Link
              href="/become-a-supplier"
              className="text-gray-700 hover:text-blue-500 flex items-center space-x-2"
            >
              <FontAwesomeIcon icon={faBriefcase} className="text-lg" />
              <span>Become a supplier</span>
            </Link>
            <Link
              href="/login"
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
            >
              Sign in
            </Link>
          </div>
        </div>

        {/* Mobile Navigation Links - Visible on Mobile Only */}
        {isMenuOpen && (
          <div className="flex flex-col md:hidden bg-white shadow-md py-2">
            <Link href="/" className="px-4 py-2 hover:bg-gray-100">
              Home
            </Link>
            <Link href="/services" className="px-4 py-2 hover:bg-gray-100">
              Services
            </Link>
            <Link href="/attractions" className="px-4 py-2 hover:bg-gray-100">
              Attractions
            </Link>
            <div className="border-t border-gray-300"></div>
            <Link
              href="#"
              className="px-4 py-2 hover:bg-gray-100 flex items-center space-x-2"
            >
              <FontAwesomeIcon icon={faHeart} className="text-lg" />
              <span>Favourites</span>
            </Link>
            <Link
              href="/become-a-supplier"
              className="px-4 py-2 hover:bg-gray-100 flex items-center space-x-2"
            >
              <FontAwesomeIcon icon={faBriefcase} className="text-lg" />
              <span>Become a supplier</span>
            </Link>
            <Link
              href="/login"
              className="bg-blue-500 text-white px-6 py-2 rounded-full w-full text-center hover:bg-blue-600"
            >
              Sign in
            </Link>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-[400px] flex items-center justify-center"
        style={{
          backgroundImage: `url('/banner.png')`, // Ensure this image is in the public folder
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* Hero Content */}
        <div className="relative container mx-auto h-full flex flex-col justify-center items-center text-center px-4 py-20">
          <h1 className="text-white text-4xl md:text-5xl font-semibold mb-4">
            Discover Amazing Places
          </h1>
          <p className="text-white text-lg md:text-xl mb-10">
            Explore the best destinations tailored just for you.
          </p>

          {/* Search Box */}
          <div className="flex items-center bg-white rounded-full shadow-lg overflow-hidden w-full max-w-4xl mx-auto mt-10">
            {/* Location Icon and Label */}
            <div className="flex items-center px-6 text-gray-500 border-r border-gray-300">
              <i className="fa fa-map-marker text-blue-500 text-lg"></i>
              <span className="ml-3 font-medium">Location</span>
            </div>

            {/* Input Field */}
            <input
              type="text"
              placeholder="Search by name of location"
              className="flex-1 px-6 py-4 text-gray-700 text-base focus:outline-none placeholder-gray-400"
            />

            {/* Search Button */}
            <button className="bg-blue-500 text-white px-8 py-4 text-base font-medium hover:bg-blue-600 transition-all duration-200 ease-in-out">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
