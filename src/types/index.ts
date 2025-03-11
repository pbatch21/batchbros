export interface Game {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  gameUrl: string;
  category: 'pauls' | 'wills';
  tags: string[];
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
  plays: number;
  rating: number;
  controls?: {
    keyboard?: string[];
    mouse?: string[];
    touch?: string[];
  };
  instructions?: string;
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