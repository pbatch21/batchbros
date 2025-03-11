import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  increment, 
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import { Game, Comment, Rating, User } from '../types';

// Game related functions
export const getGames = async (category?: 'pauls' | 'wills') => {
  try {
    let gamesQuery;
    
    if (category) {
      gamesQuery = query(
        collection(db, 'games'),
        where('category', '==', category),
        orderBy('createdAt', 'desc')
      );
    } else {
      gamesQuery = query(
        collection(db, 'games'),
        orderBy('createdAt', 'desc')
      );
    }
    
    const snapshot = await getDocs(gamesQuery);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
      updatedAt: doc.data().updatedAt.toDate()
    } as Game));
  } catch (error) {
    console.error('Error getting games:', error);
    return [];
  }
};

export const getFeaturedGames = async (limit_count = 6) => {
  try {
    const gamesQuery = query(
      collection(db, 'games'),
      where('featured', '==', true),
      orderBy('plays', 'desc'),
      limit(limit_count)
    );
    
    const snapshot = await getDocs(gamesQuery);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
      updatedAt: doc.data().updatedAt.toDate()
    } as Game));
  } catch (error) {
    console.error('Error getting featured games:', error);
    return [];
  }
};

export const getGameById = async (id: string) => {
  try {
    const gameDoc = await getDoc(doc(db, 'games', id));
    if (gameDoc.exists()) {
      const data = gameDoc.data();
      return {
        id: gameDoc.id,
        ...data,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate()
      } as Game;
    }
    return null;
  } catch (error) {
    console.error('Error getting game by ID:', error);
    return null;
  }
};

export const incrementGamePlays = async (id: string) => {
  try {
    await updateDoc(doc(db, 'games', id), {
      plays: increment(1),
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error incrementing game plays:', error);
  }
};

// User related functions
export const getUserData = async (uid: string) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data() as User;
    }
    return null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

export const addGameToRecentlyPlayed = async (uid: string, gameId: string) => {
  try {
    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      const userData = userDoc.data() as User;
      const recentlyPlayed = userData.recentlyPlayed || [];
      
      // Remove the game if it already exists in recently played
      const filteredRecentlyPlayed = recentlyPlayed.filter(game => game.gameId !== gameId);
      
      // Add the game to the beginning of the array
      const updatedRecentlyPlayed = [
        { gameId, lastPlayed: Timestamp.now() },
        ...filteredRecentlyPlayed
      ].slice(0, 10); // Keep only the 10 most recent games
      
      await updateDoc(userRef, {
        recentlyPlayed: updatedRecentlyPlayed
      });
    }
  } catch (error) {
    console.error('Error adding game to recently played:', error);
  }
};

// Comments related functions
export const getGameComments = async (gameId: string) => {
  try {
    const commentsQuery = query(
      collection(db, 'comments'),
      where('gameId', '==', gameId),
      orderBy('createdAt', 'desc')
    );
    
    const snapshot = await getDocs(commentsQuery);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
      updatedAt: doc.data().updatedAt.toDate()
    } as Comment));
  } catch (error) {
    console.error('Error getting game comments:', error);
    return [];
  }
};

export const addComment = async (comment: Omit<Comment, 'id' | 'createdAt' | 'updatedAt' | 'likes'>) => {
  try {
    const now = Timestamp.now();
    const commentData = {
      ...comment,
      createdAt: now,
      updatedAt: now,
      likes: 0
    };
    
    const docRef = await addDoc(collection(db, 'comments'), commentData);
    return {
      id: docRef.id,
      ...commentData,
      createdAt: now.toDate(),
      updatedAt: now.toDate()
    } as Comment;
  } catch (error) {
    console.error('Error adding comment:', error);
    return null;
  }
};

// Ratings related functions
export const addOrUpdateRating = async (rating: Omit<Rating, 'id' | 'createdAt'>) => {
  try {
    // Check if the user has already rated this game
    const ratingsQuery = query(
      collection(db, 'ratings'),
      where('gameId', '==', rating.gameId),
      where('userId', '==', rating.userId)
    );
    
    const snapshot = await getDocs(ratingsQuery);
    
    if (snapshot.empty) {
      // Add new rating
      const now = Timestamp.now();
      const ratingData = {
        ...rating,
        createdAt: now
      };
      
      const docRef = await addDoc(collection(db, 'ratings'), ratingData);
      return {
        id: docRef.id,
        ...ratingData,
        createdAt: now.toDate()
      } as Rating;
    } else {
      // Update existing rating
      const ratingDoc = snapshot.docs[0];
      await updateDoc(doc(db, 'ratings', ratingDoc.id), {
        score: rating.score
      });
      
      return {
        id: ratingDoc.id,
        ...ratingDoc.data(),
        score: rating.score,
        createdAt: ratingDoc.data().createdAt.toDate()
      } as Rating;
    }
  } catch (error) {
    console.error('Error adding or updating rating:', error);
    return null;
  }
};

export const getAverageRating = async (gameId: string) => {
  try {
    const ratingsQuery = query(
      collection(db, 'ratings'),
      where('gameId', '==', gameId)
    );
    
    const snapshot = await getDocs(ratingsQuery);
    
    if (snapshot.empty) {
      return 0;
    }
    
    const ratings = snapshot.docs.map(doc => doc.data().score);
    const sum = ratings.reduce((acc, score) => acc + score, 0);
    return sum / ratings.length;
  } catch (error) {
    console.error('Error getting average rating:', error);
    return 0;
  }
}; 