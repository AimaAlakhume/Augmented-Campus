export interface Clue {
  description: string;
  latitude: number;
  longitude: number;
}

export interface Hunt {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: number; // in minutes
  participants: number;
  rating: number;
  image?: string;
  isTrending?: boolean;
  clues?: Clue[];
  educationalContent?: string;
  educationalLink?: string;
}

export interface UserStats {
  completed: number;
  points: number;
  rank: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export interface User {
  name: string;
  role: string;
  avatarUrl: string;
  stats: UserStats;
  achievements: Achievement[];
}