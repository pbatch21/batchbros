import { Metadata } from 'next';
import GameCard from '@/components/ui/GameCard';
import { getGames } from '@/lib/firebaseUtils';
import { Game } from '@/types';

export const metadata: Metadata = {
  title: "Paul's Games | Batch Bros Games",
  description: "Explore Paul's collection of action-packed and strategy games. Test your skills and reflexes!",
};

// This is a server component that will fetch data at request time
export default async function PaulsGamesPage() {
  // In a real app, this would fetch from Firebase
  // For now, we'll use mock data
  const mockGames: Game[] = [
    {
      id: 'paul1',
      title: 'Space Invaders X',
      description: 'A modern take on the classic arcade game with enhanced graphics and new power-ups.',
      imageUrl: 'https://placehold.co/600x400/2563eb/FFFFFF/png?text=Space+Invaders+X',
      gameUrl: '/game/paul1',
      category: 'pauls',
      tags: ['Arcade', 'Action', 'Shooter'],
      featured: true,
      createdAt: new Date('2023-01-15'),
      updatedAt: new Date('2023-02-10'),
      plays: 12500,
      rating: 4.7,
      controls: {
        keyboard: ['Arrow keys to move', 'Space to shoot'],
      },
      instructions: 'Defend Earth from alien invaders! Move your ship and shoot down the aliens before they reach the bottom of the screen.',
    },
    {
      id: 'paul2',
      title: 'Dungeon Crawler',
      description: 'Explore procedurally generated dungeons, fight monsters, and collect treasure in this roguelike adventure.',
      imageUrl: 'https://placehold.co/600x400/2563eb/FFFFFF/png?text=Dungeon+Crawler',
      gameUrl: '/game/paul2',
      category: 'pauls',
      tags: ['RPG', 'Adventure', 'Roguelike'],
      featured: true,
      createdAt: new Date('2023-03-20'),
      updatedAt: new Date('2023-04-05'),
      plays: 8700,
      rating: 4.5,
      controls: {
        keyboard: ['WASD to move', 'Mouse to aim', 'Left click to attack'],
      },
      instructions: 'Navigate through the dungeon, defeat enemies, and find the exit to proceed to the next level. Collect items to enhance your character.',
    },
    {
      id: 'paul3',
      title: 'Racing Rivals',
      description: 'High-speed racing game with realistic physics and a variety of tracks and vehicles.',
      imageUrl: 'https://placehold.co/600x400/2563eb/FFFFFF/png?text=Racing+Rivals',
      gameUrl: '/game/paul3',
      category: 'pauls',
      tags: ['Racing', 'Sports', 'Multiplayer'],
      featured: false,
      createdAt: new Date('2023-05-10'),
      updatedAt: new Date('2023-06-15'),
      plays: 6300,
      rating: 4.2,
      controls: {
        keyboard: ['Arrow keys to steer', 'Space for nitro boost'],
      },
      instructions: 'Race against opponents on various tracks. Use nitro boosts strategically to gain advantage.',
    },
    {
      id: 'paul4',
      title: 'Zombie Survival',
      description: 'Survive waves of zombies in this intense action game. Upgrade weapons and defenses to last longer.',
      imageUrl: 'https://placehold.co/600x400/2563eb/FFFFFF/png?text=Zombie+Survival',
      gameUrl: '/game/paul4',
      category: 'pauls',
      tags: ['Survival', 'Horror', 'Action'],
      featured: false,
      createdAt: new Date('2023-07-05'),
      updatedAt: new Date('2023-08-10'),
      plays: 9200,
      rating: 4.6,
      controls: {
        keyboard: ['WASD to move', 'Mouse to aim', 'Left click to shoot', 'R to reload'],
      },
      instructions: 'Survive as long as possible against endless waves of zombies. Collect resources and upgrade your equipment between waves.',
    },
    {
      id: 'paul5',
      title: 'Strategy Commander',
      description: 'Build your base, train units, and conquer territories in this real-time strategy game.',
      imageUrl: 'https://placehold.co/600x400/2563eb/FFFFFF/png?text=Strategy+Commander',
      gameUrl: '/game/paul5',
      category: 'pauls',
      tags: ['Strategy', 'RTS', 'War'],
      featured: true,
      createdAt: new Date('2023-09-15'),
      updatedAt: new Date('2023-10-20'),
      plays: 5800,
      rating: 4.4,
      controls: {
        mouse: ['Left click to select', 'Right click to move/attack'],
      },
      instructions: 'Gather resources, build structures, train units, and defeat your opponents by destroying their base.',
    },
    {
      id: 'paul6',
      title: 'Platformer Adventure',
      description: 'Jump, run, and solve puzzles in this colorful platformer game with multiple worlds to explore.',
      imageUrl: 'https://placehold.co/600x400/2563eb/FFFFFF/png?text=Platformer+Adventure',
      gameUrl: '/game/paul6',
      category: 'pauls',
      tags: ['Platformer', 'Adventure', 'Puzzle'],
      featured: false,
      createdAt: new Date('2023-11-10'),
      updatedAt: new Date('2023-12-15'),
      plays: 7400,
      rating: 4.3,
      controls: {
        keyboard: ['Arrow keys to move', 'Space to jump', 'E to interact'],
      },
      instructions: 'Navigate through levels, collect coins, avoid obstacles, and reach the end flag to progress.',
    },
  ];

  // In a real app, we would use:
  // const games = await getGames('pauls');

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Paul's Games</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore Paul's collection of action-packed and strategy games. Test your skills and reflexes!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>
    </div>
  );
} 