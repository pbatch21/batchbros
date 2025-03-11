# Batch Bros Games

A modern gaming website inspired by CrazyGames, featuring collections of games from Paul and Will.

## 🎮 Overview

Batch Bros Games is a web platform that hosts browser-based games categorized into two main collections: Paul's Games and Will's Games. The site allows users to browse, play, and rate games, as well as create accounts to track their favorites and gaming history.

## ✨ Features

- **Two Game Collections**: Browse games from Paul's collection or Will's collection
- **User Authentication**: Sign up, log in, and manage your profile
- **Game Filtering**: Filter games by category, tags, and featured status
- **Game Details**: View game information, instructions, and controls
- **Responsive Design**: Enjoy the site on any device - desktop, tablet, or mobile

## 🛠️ Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Firebase (Authentication, Firestore, Storage)
- **UI Libraries**: Framer Motion, React Icons, Headless UI
- **Deployment**: Vercel (planned)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/batch-bros-games.git
   cd batch-bros-games
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with your Firebase configuration:
   ```
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

   # NextAuth Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📁 Project Structure

```
/src
  /app                 # Next.js App Router pages
  /components          # React components
    /layout            # Layout components (Navbar, Footer)
    /ui                # UI components (Button, GameCard)
  /context             # React context providers
  /lib                 # Utility functions and Firebase setup
  /types               # TypeScript type definitions
/public                # Static assets
```

## 🔥 Firebase Setup

1. Create a Firebase project at [firebase.google.com](https://firebase.google.com)
2. Enable Authentication (Email/Password and Google providers)
3. Create a Firestore database with the following collections:
   - `games`: Game information
   - `users`: User profiles
   - `comments`: Game comments
   - `ratings`: Game ratings
4. Set up Firebase Storage for game images

## 🌐 Deployment

The site is planned to be deployed on [batchbros.com](https://batchbros.com).

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributors

- Paul Batchelder
- Will Batchelder
