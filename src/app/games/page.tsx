import { Metadata } from 'next';
import Link from 'next/link';
import GameCard from '@/components/ui/GameCard';
import { getGames } from '@/lib/firebaseUtils';
import { Game } from '@/types';

export const metadata: Metadata = {
  title: "All Games | Batch Bros Games",
  description: "Browse our complete collection of games from both Paul and Will. Find your next favorite game!",
};

// This is a server component that will fetch data at request time
export default async function GamesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Get filter parameters from URL - properly handle as properties
  const category = searchParams?.category ? String(searchParams.category) : undefined;
  const featured = searchParams?.featured === 'true';
  const tag = searchParams?.tag ? String(searchParams.tag) : undefined;
  
  // In a real app, this would fetch from Firebase
  // For now, we'll combine the mock data from both Paul's and Will's games
  const paulsGames: Game[] = [
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
  ];
  
  const willsGames: Game[] = [
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
  ];
  
  // Combine all games
  let allGames: Game[] = [...paulsGames, ...willsGames];
  
  // Apply filters
  if (category) {
    allGames = allGames.filter(game => game.category === category);
  }
  
  if (featured) {
    allGames = allGames.filter(game => game.featured);
  }
  
  if (tag) {
    allGames = allGames.filter(game => game.tags.includes(tag));
  }
  
  // Sort games by plays (most popular first)
  allGames.sort((a, b) => b.plays - a.plays);
  
  // Get all unique tags for the filter
  const allTags = Array.from(new Set(allGames.flatMap(game => game.tags))).sort();

  // Helper function to create filter URLs
  const createFilterUrl = (params: { [key: string]: string | null }) => {
    const newParams = new URLSearchParams();
    
    // Add current params
    if (category) newParams.set('category', category);
    if (featured) newParams.set('featured', 'true');
    if (tag) newParams.set('tag', tag);
    
    // Update with new params
    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });
    
    return `/games?${newParams.toString()}`;
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">All Games</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Browse our complete collection of games from both Paul and Will. Find your next favorite game!
          </p>
        </div>
        
        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category"
                name="category"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                defaultValue={category || ''}
              >
                <option value="">All Categories</option>
                <option value="pauls">Paul's Games</option>
                <option value="wills">Will's Games</option>
              </select>
              <div className="mt-2 flex gap-2">
                <Link 
                  href={createFilterUrl({ category: 'pauls' })}
                  className="text-xs text-blue-600 hover:underline"
                >
                  Paul's
                </Link>
                <Link 
                  href={createFilterUrl({ category: 'wills' })}
                  className="text-xs text-blue-600 hover:underline"
                >
                  Will's
                </Link>
                <Link 
                  href={createFilterUrl({ category: null })}
                  className="text-xs text-blue-600 hover:underline"
                >
                  All
                </Link>
              </div>
            </div>
            
            <div>
              <label htmlFor="tag" className="block text-sm font-medium text-gray-700 mb-1">
                Tag
              </label>
              <select
                id="tag"
                name="tag"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                defaultValue={tag || ''}
              >
                <option value="">All Tags</option>
                {allTags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
              <div className="mt-2 flex flex-wrap gap-2">
                {allTags.slice(0, 5).map((tagName) => (
                  <Link 
                    key={tagName}
                    href={createFilterUrl({ tag: tagName })}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    {tagName}
                  </Link>
                ))}
                <Link 
                  href={createFilterUrl({ tag: null })}
                  className="text-xs text-blue-600 hover:underline"
                >
                  Clear
                </Link>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="flex items-center">
                <Link 
                  href={createFilterUrl({ featured: featured ? null : 'true' })}
                  className={`inline-flex items-center px-3 py-1.5 rounded-md ${
                    featured 
                      ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  <span className="text-sm font-medium">Featured Games</span>
                  {featured && (
                    <span className="ml-1 text-xs">(active)</span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {allGames.length > 0 ? (
            allGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <h3 className="text-xl font-medium text-gray-900 mb-2">No games found</h3>
              <p className="text-gray-600">
                Try adjusting your filters to find games.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 