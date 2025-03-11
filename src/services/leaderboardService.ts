import { db } from '@/lib/firebase';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  limit, 
  getDocs, 
  addDoc, 
  serverTimestamp,
  DocumentData
} from 'firebase/firestore';
import { GameScore, UserProfile } from '@/types';

export async function getTopScores(gameId?: string, limitCount: number = 10): Promise<GameScore[]> {
  try {
    let scoresQuery;
    
    if (gameId) {
      // Get top scores for a specific game
      scoresQuery = query(
        collection(db, 'scores'),
        where('gameId', '==', gameId),
        orderBy('score', 'desc'),
        limit(limitCount)
      );
    } else {
      // Get top scores across all games
      scoresQuery = query(
        collection(db, 'scores'),
        orderBy('score', 'desc'),
        limit(limitCount)
      );
    }
    
    const querySnapshot = await getDocs(scoresQuery);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        gameId: data.gameId,
        gameTitle: data.gameTitle,
        userId: data.userId,
        userName: data.userName,
        userPhotoURL: data.userPhotoURL,
        score: data.score,
        timestamp: data.timestamp.toDate()
      } as GameScore;
    });
  } catch (error) {
    console.error('Error getting top scores:', error);
    return [];
  }
}

export async function getTopPlayers(limitCount: number = 10): Promise<UserProfile[]> {
  try {
    const usersQuery = query(
      collection(db, 'users'),
      orderBy('totalScore', 'desc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(usersQuery);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        uid: doc.id,
        name: data.name,
        email: data.email,
        photoURL: data.photoURL,
        createdAt: data.createdAt,
        games: data.games || [],
        favorites: data.favorites || [],
        totalScore: data.totalScore || 0,
        gamesPlayed: data.gamesPlayed || 0
      } as UserProfile;
    });
  } catch (error) {
    console.error('Error getting top players:', error);
    return [];
  }
}

export async function getUserScores(userId: string, limitCount: number = 10): Promise<GameScore[]> {
  try {
    const scoresQuery = query(
      collection(db, 'scores'),
      where('userId', '==', userId),
      orderBy('score', 'desc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(scoresQuery);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        gameId: data.gameId,
        gameTitle: data.gameTitle,
        userId: data.userId,
        userName: data.userName,
        userPhotoURL: data.userPhotoURL,
        score: data.score,
        timestamp: data.timestamp.toDate()
      } as GameScore;
    });
  } catch (error) {
    console.error('Error getting user scores:', error);
    return [];
  }
}

export async function addScore(
  gameId: string, 
  gameTitle: string, 
  userId: string, 
  userName: string, 
  score: number,
  userPhotoURL?: string
): Promise<string | null> {
  try {
    const scoreData = {
      gameId,
      gameTitle,
      userId,
      userName,
      userPhotoURL: userPhotoURL || null,
      score,
      timestamp: serverTimestamp()
    };
    
    const docRef = await addDoc(collection(db, 'scores'), scoreData);
    return docRef.id;
  } catch (error) {
    console.error('Error adding score:', error);
    return null;
  }
} 