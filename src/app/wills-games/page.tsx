import { Metadata } from 'next';
import GameCard from '@/components/ui/GameCard';
import { getGames } from '@/lib/firebaseUtils';
import { Game } from '@/types';

export const metadata: Metadata = {
  title: "Will's Games | Batch Bros Games",
  description: "Dive into Will's collection of puzzle and adventure games. Challenge your mind and creativity!",
};

// This is a server component that will fetch data at request time
export default async function WillsGamesPage() {
  // In a real app, this would fetch from Firebase
  // For now, we'll use mock data
  const mockGames: Game[] = [
    {
      id: 'will1',
      title: 'Puzzle Master',
      description: 'Challenge your brain with hundreds of unique puzzles ranging from easy to expert difficulty.',
      imageUrl: 'https://placehold.co/600x400/9333ea/FFFFFF/png?text=Puzzle+Master',
      gameUrl: '/game/will1',
      category: 'wills',
      tags: ['Puzzle', 'Brain Teaser', 'Logic'],
      featured: true,
      createdAt: new Date('2023-01-20'),
      updatedAt: new Date('2023-02-15'),
      plays: 11200,
      rating: 4.8,
      controls: {
        mouse: ['Click and drag to solve puzzles'],
      },
      instructions: 'Solve various puzzles by arranging pieces, finding patterns, or solving logic problems. Each level increases in difficulty.',
    },
    {
      id: 'will2',
      title: 'Mystery Detective',
      description: 'Solve crimes and mysteries in this detective adventure game with immersive storytelling.',
      imageUrl: 'https://placehold.co/600x400/9333ea/FFFFFF/png?text=Mystery+Detective',
      gameUrl: '/game/will2',
      category: 'wills',
      tags: ['Adventure', 'Mystery', 'Story'],
      featured: true,
      createdAt: new Date('2023-03-10'),
      updatedAt: new Date('2023-04-15'),
      plays: 9300,
      rating: 4.6,
      controls: {
        mouse: ['Click to interact', 'Click and drag to examine objects'],
      },
      instructions: 'Investigate crime scenes, collect evidence, interview suspects, and solve the mystery. Pay attention to details!',
    },
    {
      id: 'will3',
      title: 'Word Wizard',
      description: 'Test your vocabulary and word skills in this challenging word game with multiple modes.',
      imageUrl: 'https://placehold.co/600x400/9333ea/FFFFFF/png?text=Word+Wizard',
      gameUrl: '/game/will3',
      category: 'wills',
      tags: ['Word', 'Educational', 'Casual'],
      featured: false,
      createdAt: new Date('2023-05-05'),
      updatedAt: new Date('2023-06-10'),
      plays: 7800,
      rating: 4.3,
      controls: {
        keyboard: ['Type words', 'Enter to submit'],
        mouse: ['Click on letters'],
      },
      instructions: 'Form words from given letters, solve anagrams, or find words in a grid. The faster you solve, the higher your score.',
    },
    {
      id: 'will4',
      title: 'Escape Room',
      description: 'Find clues, solve puzzles, and escape from various themed rooms in this immersive escape game.',
      imageUrl: 'https://placehold.co/600x400/9333ea/FFFFFF/png?text=Escape+Room',
      gameUrl: '/game/will4',
      category: 'wills',
      tags: ['Puzzle', 'Escape', 'Adventure'],
      featured: true,
      createdAt: new Date('2023-07-15'),
      updatedAt: new Date('2023-08-20'),
      plays: 10500,
      rating: 4.7,
      controls: {
        mouse: ['Click to interact', 'Click and drag to examine objects'],
      },
      instructions: 'Search for clues, solve puzzles, and find the way to escape each room within the time limit.',
    },
    {
      id: 'will5',
      title: 'Chess Champion',
      description: 'Play chess against AI opponents of various difficulty levels or challenge other players online.',
      imageUrl: 'https://placehold.co/600x400/9333ea/FFFFFF/png?text=Chess+Champion',
      gameUrl: '/game/will5',
      category: 'wills',
      tags: ['Strategy', 'Board Game', 'Multiplayer'],
      featured: false,
      createdAt: new Date('2023-09-10'),
      updatedAt: new Date('2023-10-15'),
      plays: 6200,
      rating: 4.5,
      controls: {
        mouse: ['Click and drag pieces to move'],
      },
      instructions: 'Play chess according to standard rules. Capture the opponent\'s king to win the game.',
    },
    {
      id: 'will6',
      title: 'Memory Match',
      description: 'Test and improve your memory with this classic card matching game with various themes and difficulties.',
      imageUrl: 'https://placehold.co/600x400/9333ea/FFFFFF/png?text=Memory+Match',
      gameUrl: '/game/will6',
      category: 'wills',
      tags: ['Memory', 'Casual', 'Educational'],
      featured: false,
      createdAt: new Date('2023-11-05'),
      updatedAt: new Date('2023-12-10'),
      plays: 8100,
      rating: 4.2,
      controls: {
        mouse: ['Click to flip cards'],
        touch: ['Tap to flip cards'],
      },
      instructions: 'Flip cards to find matching pairs. Remember the positions of cards you\'ve seen to make matches more efficiently.',
    },
  ];

  // In a real app, we would use:
  // const games = await getGames('wills');

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Will's Games</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dive into Will's collection of puzzle and adventure games. Challenge your mind and creativity!
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