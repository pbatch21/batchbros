"use client";

import Link from 'next/link';
import { FaGamepad, FaTwitter, FaFacebook, FaInstagram, FaGithub } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <FaGamepad className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold">Batch Bros Games</span>
            </div>
            <p className="text-gray-400 text-sm">
              The ultimate gaming destination for Paul and Will's awesome game collections.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400">
                <FaTwitter className="h-5 w-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400">
                <FaFacebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400">
                <FaInstagram className="h-5 w-5" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400">
                <FaGithub className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Games</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/pauls-games" className="text-gray-400 hover:text-white">
                  Paul's Games
                </Link>
              </li>
              <li>
                <Link href="/wills-games" className="text-gray-400 hover:text-white">
                  Will's Games
                </Link>
              </li>
              <li>
                <Link href="/games" className="text-gray-400 hover:text-white">
                  All Games
                </Link>
              </li>
              <li>
                <Link href="/games?featured=true" className="text-gray-400 hover:text-white">
                  Featured Games
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Support</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Subscribe</h3>
            <p className="mt-4 text-gray-400 text-sm">
              Subscribe to our newsletter for the latest updates and game releases.
            </p>
            <form className="mt-4">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="min-w-0 flex-1 bg-gray-800 border border-gray-700 rounded-l-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-r-md px-4 py-2 font-medium"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} Batch Bros Games. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm mt-4 md:mt-0">
            Hosted on <a href="https://batchbros.com" className="text-blue-400 hover:underline">batchbros.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
} 