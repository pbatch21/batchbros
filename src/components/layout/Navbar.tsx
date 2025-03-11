"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaGamepad, FaBars, FaTimes, FaUser, FaTrophy } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Button';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { currentUser, userProfile, signOut } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      closeMenu();
    } catch (error) {
      console.error('Failed to sign out', error);
    }
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  const profileImageUrl = currentUser?.photoURL || userProfile?.photoURL;

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center" onClick={closeMenu}>
              <FaGamepad className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Batch Bros Games</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/') 
                    ? 'border-blue-500 text-gray-900' 
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Home
              </Link>
              <Link
                href="/games"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/games') 
                    ? 'border-blue-500 text-gray-900' 
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                All Games
              </Link>
              <Link
                href="/pauls-games"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/pauls-games') 
                    ? 'border-blue-500 text-gray-900' 
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Paul's Games
              </Link>
              <Link
                href="/wills-games"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/wills-games') 
                    ? 'border-blue-500 text-gray-900' 
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Will's Games
              </Link>
              <Link
                href="/leaderboard"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/leaderboard') 
                    ? 'border-blue-500 text-gray-900' 
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                <FaTrophy className="mr-1 h-4 w-4" />
                Leaderboard
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {currentUser ? (
              <div className="ml-3 relative flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  Hi, {currentUser.displayName || userProfile?.name || 'User'}
                </span>
                <div className="relative w-8 h-8 rounded-full overflow-hidden">
                  {profileImageUrl ? (
                    <Image 
                      src={profileImageUrl} 
                      alt="Profile" 
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-blue-100">
                      <FaUser className="h-4 w-4 text-blue-600" />
                    </div>
                  )}
                </div>
                <Button onClick={handleSignOut} variant="secondary" size="sm">
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link href="/login">
                  <Button variant="secondary" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button variant="primary" size="sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <FaTimes className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <FaBars className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`sm:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link
            href="/"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
              isActive('/') 
                ? 'bg-blue-50 border-blue-500 text-blue-700' 
                : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
            }`}
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link
            href="/games"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
              isActive('/games') 
                ? 'bg-blue-50 border-blue-500 text-blue-700' 
                : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
            }`}
            onClick={closeMenu}
          >
            All Games
          </Link>
          <Link
            href="/pauls-games"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
              isActive('/pauls-games') 
                ? 'bg-blue-50 border-blue-500 text-blue-700' 
                : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
            }`}
            onClick={closeMenu}
          >
            Paul's Games
          </Link>
          <Link
            href="/wills-games"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
              isActive('/wills-games') 
                ? 'bg-blue-50 border-blue-500 text-blue-700' 
                : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
            }`}
            onClick={closeMenu}
          >
            Will's Games
          </Link>
          <Link
            href="/leaderboard"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
              isActive('/leaderboard') 
                ? 'bg-blue-50 border-blue-500 text-blue-700' 
                : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
            }`}
            onClick={closeMenu}
          >
            <div className="flex items-center">
              <FaTrophy className="mr-2 h-4 w-4" />
              Leaderboard
            </div>
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          {currentUser ? (
            <div className="flex items-center px-4">
              <div className="flex-shrink-0 relative w-10 h-10 rounded-full overflow-hidden">
                {profileImageUrl ? (
                  <Image 
                    src={profileImageUrl} 
                    alt="Profile" 
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-blue-100">
                    <FaUser className="h-6 w-6 text-blue-600" />
                  </div>
                )}
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">
                  {currentUser.displayName || userProfile?.name || 'User'}
                </div>
                <div className="text-sm font-medium text-gray-500">
                  {currentUser.email}
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="ml-auto flex-shrink-0 bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <span className="sr-only">Sign out</span>
                <span className="text-sm text-red-600">Sign out</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col space-y-3 px-4">
              <Link
                href="/login"
                className="block text-center px-4 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                onClick={closeMenu}
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="block text-center px-4 py-2 rounded-md text-base font-medium text-blue-600 bg-white border border-blue-600 hover:bg-blue-50"
                onClick={closeMenu}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
} 