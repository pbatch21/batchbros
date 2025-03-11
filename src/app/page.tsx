import Image from "next/image";
import Link from "next/link";
import { FaGamepad, FaArrowRight } from "react-icons/fa";
import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Welcome to <span className="text-blue-400">Batch Bros Games</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8">
                Discover the ultimate collection of games from Paul and Will. Play, compete, and have fun!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/pauls-games">
                  <Button size="lg" className="w-full sm:w-auto">
                    Paul's Games
                  </Button>
                </Link>
                <Link href="/wills-games">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                    Will's Games
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md h-80">
                <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-lg transform rotate-6 opacity-70"></div>
                <div className="absolute top-10 left-10 w-64 h-64 bg-purple-500 rounded-lg transform -rotate-6 opacity-70"></div>
                <div className="absolute top-5 left-5 w-64 h-64 bg-white rounded-lg flex items-center justify-center">
                  <FaGamepad className="text-8xl text-blue-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
            <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Batch Bros Games?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer a unique gaming experience with carefully curated collections from Paul and Will.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Instant Play</h3>
              <p className="text-gray-600">
                No downloads required. Play all our games directly in your browser without any installation.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Multiplayer Support</h3>
              <p className="text-gray-600">
                Compete with friends or players around the world with our multiplayer games and leaderboards.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Customizable Experience</h3>
              <p className="text-gray-600">
                Create an account to track your progress, save favorites, and customize your gaming experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Game Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Explore Our Game Collections</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover games curated by Paul and Will, each with their unique style and gameplay.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative overflow-hidden rounded-xl group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-90 group-hover:opacity-95 transition-opacity"></div>
              <div className="relative p-8 md:p-12 h-full flex flex-col justify-between z-10 text-white">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">Paul's Games</h3>
                  <p className="text-white/80 mb-6">
                    A collection of action-packed and strategy games curated by Paul. Test your skills and reflexes!
                  </p>
                </div>
                <Link href="/pauls-games" className="inline-flex items-center text-white font-medium group">
                  Explore Collection
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
            
            <div className="relative overflow-hidden rounded-xl group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-800 opacity-90 group-hover:opacity-95 transition-opacity"></div>
              <div className="relative p-8 md:p-12 h-full flex flex-col justify-between z-10 text-white">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">Will's Games</h3>
                  <p className="text-white/80 mb-6">
                    Dive into Will's collection of puzzle and adventure games. Challenge your mind and creativity!
                  </p>
                </div>
                <Link href="/wills-games" className="inline-flex items-center text-white font-medium group">
                  Explore Collection
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white relative">
        <div className="absolute inset-0 bg-[url('/cta-pattern.svg')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Playing?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Join thousands of players already enjoying Batch Bros Games. Sign up for free and start playing today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg">
                  Sign Up Now
                </Button>
              </Link>
              <Link href="/games">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Browse All Games
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
