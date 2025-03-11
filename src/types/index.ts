export interface Game {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  gameUrl: string;
  category: string;
  tags: string[];
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
  plays: number;
  rating: number;
  controls: {
    keyboard?: string[];
    mouse?: string[];
    touch?: string[];
  };
  instructions: string;
}

export interface GameScore {
  id: string;
  gameId: string;
  gameTitle: string;
  userId: string;
  userName: string;
  userPhotoURL?: string;
  score: number;
  timestamp: Date;
}

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  photoURL?: string;
  createdAt: string;
  games: string[];
  favorites: string[];
  totalScore?: number;
  gamesPlayed?: number;
}

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  favorites: string[];
  recentlyPlayed: {
    gameId: string;
    lastPlayed: Date;
  }[];
}

export interface Comment {
  id: string;
  gameId: string;
  userId: string;
  userDisplayName: string;
  userPhotoURL: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  likes: number;
}

export interface Rating {
  id: string;
  gameId: string;
  userId: string;
  score: number;
  createdAt: Date;
} 