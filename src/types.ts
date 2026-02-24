
export type Language = 'en' | 'hi' | 'mr' | 'ta' | 'te' | 'kn';

export interface UserProfile {
  name: string;
  location: string;
  cropType: string;
  soilType: string;
  language: Language;
}

export interface FarmTask {
  id: string;
  title: string;
  date: string;
  completed: boolean;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
