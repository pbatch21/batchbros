"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaGamepad, FaBars, FaTimes, FaUser } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Button';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { currentUser, logOut } = useAuth();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: "Paul's Games", href: '/pauls-games' },
    { name: "Will's Games", href: '/wills-games' },
    { name: 'All Games', href: '/games' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && pathname !== '/') {
      return false;
    }
    return pathname?.startsWith(path);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <FaGamepad className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Batch Bros Games</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActive(link.href)
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {currentUser ? (
              <div className="flex items-center space-x-4">
                <Link href="/profile" className="text-gray-500 hover:text-gray-700">
                  <span className="sr-only">Profile</span>
                  <div className="flex items-center">
                    {currentUser.photoURL ? (
                      <img
                        className="h-8 w-8 rounded-full"
                        src={currentUser.photoURL}
                        alt={currentUser.displayName || 'User'}
                      />
                    ) : (
                      <FaUser className="h-5 w-5" />
                    )}
                    <span className="ml-2">{currentUser.displayName}</span>
                  </div>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => logOut()}
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <FaTimes className="block h-6 w-6" />
              ) : (
                <FaBars className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  isActive(link.href)
                    ? 'bg-blue-50 border-blue-500 text-blue-700'
                    : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {currentUser ? (
              <div>
                <div className="flex items-center px-4">
                  {currentUser.photoURL ? (
                    <img
                      className="h-10 w-10 rounded-full"
                      src={currentUser.photoURL}
                      alt={currentUser.displayName || 'User'}
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <FaUser className="h-5 w-5 text-gray-500" />
                    </div>
                  )}
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">
                      {currentUser.displayName}
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      {currentUser.email}
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Your Profile
                  </Link>
                  <button
                    onClick={() => {
                      logOut();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-3 space-y-1 px-4">
                <Link
                  href="/login"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
} 