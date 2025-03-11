"use client";

import Image from 'next/image';
import Link from 'next/link';
import { FaStar, FaPlay } from 'react-icons/fa';
import { Game } from '@/types';

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-xl">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={game.imageUrl}
          alt={game.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full transition-transform duration-300 group-hover:translate-y-0">
          <Link href={`/game/${game.id}`} className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium">
            <FaPlay className="text-sm" />
            Play Now
          </Link>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between">
          <h3 className="font-bold text-lg text-gray-900 line-clamp-1">{game.title}</h3>
          <div className="flex items-center gap-1 text-yellow-500">
            <FaStar />
            <span className="text-sm font-medium">{game.rating.toFixed(1)}</span>
          </div>
        </div>
        
        <p className="mt-1 text-sm text-gray-600 line-clamp-2">{game.description}</p>
        
        <div className="mt-3 flex flex-wrap gap-1">
          {game.tags.slice(0, 3).map((tag) => (
            <span 
              key={tag} 
              className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800"
            >
              {tag}
            </span>
          ))}
          {game.tags.length > 3 && (
            <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
              +{game.tags.length - 3}
            </span>
          )}
        </div>
        
        <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
          <span>{game.category === 'pauls' ? "Paul's Game" : "Will's Game"}</span>
          <span>{game.plays.toLocaleString()} plays</span>
        </div>
      </div>
    </div>
  );
} 