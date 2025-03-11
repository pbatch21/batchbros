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

      {/* Game Collections Section */}
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
