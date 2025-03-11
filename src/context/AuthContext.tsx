"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  User as FirebaseUser,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db, storage } from '../lib/firebase';
import { User } from '../types';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface AuthContextType {
  currentUser: FirebaseUser | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string, profileImage?: File | null) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<FirebaseUser>;
}

interface UserProfile {
  name: string;
  email: string;
  photoURL?: string;
  createdAt: string;
  games: string[];
  favorites: string[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile data from Firestore
  const fetchUserProfile = async (user: FirebaseUser) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        setUserProfile(userDoc.data() as UserProfile);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        await fetchUserProfile(user);
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  async function signIn(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  async function signUp(email: string, password: string, name: string, profileImage: File | null = null) {
    try {
      // Create the user account
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;
      
      let photoURL = '';
      
      // Upload profile image if provided
      if (profileImage) {
        const storageRef = ref(storage, `profile_pictures/${user.uid}`);
        await uploadBytes(storageRef, profileImage);
        photoURL = await getDownloadURL(storageRef);
      }
      
      // Update the user's profile with their name and photo URL
      await updateProfile(user, { 
        displayName: name,
        photoURL: photoURL || null
      });
      
      // Create a user document in Firestore
      const userData: UserProfile = {
        name,
        email,
        photoURL,
        createdAt: new Date().toISOString(),
        games: [],
        favorites: []
      };
      
      await setDoc(doc(db, 'users', user.uid), userData);
      setUserProfile(userData);
      
      return result;
    } catch (error) {
      console.error("Error in sign up:", error);
      throw error;
    }
  }

  async function signOut() {
    setUserProfile(null);
    return firebaseSignOut(auth);
  }

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    
    // Check if user document exists
    const userDoc = await getDoc(doc(db, 'users', result.user.uid));
    
    if (!userDoc.exists()) {
      // Create user document if it doesn't exist
      const newUser: UserProfile = {
        uid: result.user.uid,
        email: result.user.email || '',
        displayName: result.user.displayName || '',
        photoURL: result.user.photoURL || '',
        favorites: [],
        recentlyPlayed: [],
        createdAt: new Date().toISOString(),
        games: []
      };
      
      await setDoc(doc(db, 'users', result.user.uid), newUser);
    }
    
    return result.user;
  };

  const value = {
    currentUser,
    userProfile,
    loading,
    signIn,
    signUp,
    signOut,
    signInWithGoogle
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
} 