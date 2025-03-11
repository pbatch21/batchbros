'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaTrophy, FaUser, FaGamepad, FaMedal } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';
import { getTopScores, getTopPlayers, getUserScores } from '@/services/leaderboardService';
import { GameScore, UserProfile } from '@/types';

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<'global' | 'games' | 'personal'>('global');
  const [topScores, setTopScores] = useState<GameScore[]>([]);
  const [topPlayers, setTopPlayers] = useState<UserProfile[]>([]);
  const [userScores, setUserScores] = useState<GameScore[]>([]);
  const [selectedGame, setSelectedGame] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  
  const { currentUser } = useAuth();
  
  useEffect(() => {
    async function fetchLeaderboardData() {
      setLoading(true);
      
      if (activeTab === 'global') {
        const players = await getTopPlayers(10);
        setTopPlayers(players);
      } else if (activeTab === 'games') {
        const scores = await getTopScores(selectedGame, 10);
        setTopScores(scores);
      } else if (activeTab === 'personal' && currentUser) {
        const scores = await getUserScores(currentUser.uid, 10);
        setUserScores(scores);
      }
      
      setLoading(false);
    }
    
    fetchLeaderboardData();
  }, [activeTab, selectedGame, currentUser]);
  
  const getMedalColor = (index: number) => {
    switch (index) {
      case 0: return 'text-yellow-500'; // Gold
      case 1: return 'text-gray-400';   // Silver
      case 2: return 'text-amber-600';  // Bronze
      default: return 'text-gray-300';  // Other positions
    }
  };
  
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
            <FaTrophy className="text-yellow-500 mr-3" />
            Leaderboard
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See who's topping the charts in our games. Can you make it to the top?
          </p>
        </div>
        
        {/* Tabs */}
        <div className="bg-white shadow rounded-lg mb-8">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('global')}
              className={`flex-1 py-4 px-6 text-center font-medium ${
                activeTab === 'global'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Top Players
            </button>
            <button
              onClick={() => setActiveTab('games')}
              className={`flex-1 py-4 px-6 text-center font-medium ${
                activeTab === 'games'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Game Scores
            </button>
            <button
              onClick={() => setActiveTab('personal')}
              className={`flex-1 py-4 px-6 text-center font-medium ${
                activeTab === 'personal'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              disabled={!currentUser}
            >
              Your Scores
            </button>
          </div>
          
          {/* Game selector (only visible in 'games' tab) */}
          {activeTab === 'games' && (
            <div className="p-4 border-b">
              <label htmlFor="game-select" className="block text-sm font-medium text-gray-700 mb-1">
                Select Game
              </label>
              <select
                id="game-select"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={selectedGame || ''}
                onChange={(e) => setSelectedGame(e.target.value || undefined)}
              >
                <option value="">All Games</option>
                <option value="paul1">Space Invaders X</option>
                <option value="paul2">Dungeon Crawler</option>
                <option value="paul3">Racing Rivals</option>
                <option value="will1">Puzzle Master</option>
                <option value="will2">Mystery Detective</option>
                <option value="will3">Word Wizard</option>
              </select>
            </div>
          )}
          
          {/* Content based on active tab */}
          <div className="p-6">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <>
                {activeTab === 'global' && (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Rank
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Player
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total Score
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Games Played
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {topPlayers.length > 0 ? (
                          topPlayers.map((player, index) => (
                            <tr key={player.uid} className={index < 3 ? 'bg-blue-50' : ''}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <FaMedal className={`h-5 w-5 mr-1 ${getMedalColor(index)}`} />
                                  <span className="text-sm font-medium text-gray-900">{index + 1}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-10 w-10 relative">
                                    {player.photoURL ? (
                                      <Image 
                                        src={player.photoURL} 
                                        alt={player.name} 
                                        fill
                                        className="rounded-full object-cover"
                                      />
                                    ) : (
                                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                        <FaUser className="h-5 w-5 text-blue-600" />
                                      </div>
                                    )}
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">{player.name}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900 font-bold">{player.totalScore?.toLocaleString() || 0}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {player.gamesPlayed || 0}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                              No player data available yet.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
                
                {activeTab === 'games' && (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Rank
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Player
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Game
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Score
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {topScores.length > 0 ? (
                          topScores.map((score, index) => (
                            <tr key={score.id} className={index < 3 ? 'bg-blue-50' : ''}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <FaMedal className={`h-5 w-5 mr-1 ${getMedalColor(index)}`} />
                                  <span className="text-sm font-medium text-gray-900">{index + 1}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-10 w-10 relative">
                                    {score.userPhotoURL ? (
                                      <Image 
                                        src={score.userPhotoURL} 
                                        alt={score.userName} 
                                        fill
                                        className="rounded-full object-cover"
                                      />
                                    ) : (
                                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                        <FaUser className="h-5 w-5 text-blue-600" />
                                      </div>
                                    )}
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">{score.userName}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <FaGamepad className="h-4 w-4 mr-2 text-blue-500" />
                                  <div className="text-sm text-gray-900">{score.gameTitle}</div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900 font-bold">{score.score.toLocaleString()}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {score.timestamp.toLocaleDateString()}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                              No game data available yet.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 