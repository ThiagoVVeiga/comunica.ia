// Tipos compartilhados entre frontend e backend

export interface Pictogram {
  id: number;
  name: string;
  imageUrl: string;
  category: string;
  subcategory?: string;
  tags: string[];
  language: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  subcategories: Subcategory[];
  order: number;
}

export interface Subcategory {
  id: string;
  name: string;
  categoryId: string;
  order: number;
}

export interface Phrase {
  id: string;
  name: string;
  pictograms: Pictogram[];
  text: string;
  audioUrl?: string;
  isCustom: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserSettings {
  id: string;
  userId: string;
  theme: 'light' | 'dark' | 'high-contrast';
  fontSize: 'small' | 'medium' | 'large' | 'extra-large';
  speechRate: number;
  speechPitch: number;
  speechVolume: number;
  language: string;
  showText: boolean;
  showImages: boolean;
  gridSize: 'small' | 'medium' | 'large';
  autoSpeak: boolean;
}

export interface SpeechSettings {
  rate: number;
  pitch: number;
  volume: number;
  language: string;
  voice?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Tipos para integração com ARASAAC
export interface ArasaacPictogram {
  _id: number;
  keywords: Array<{
    keyword: string;
    meaning: string;
    lse: boolean;
    locImg: string;
  }>;
  created: string;
  lastUpdated: string;
  downloads: number;
  tags: string[];
  sex: boolean;
  violence: boolean;
  aac: boolean;
  aacColor: boolean;
  skin: boolean;
  hair: boolean;
  downloads: number;
  categories: string[];
  pictos: Array<{
    _id: number;
    image: string;
    color: boolean;
    b64: string;
  }>;
}

export interface ArasaacCategory {
  id: number;
  name: string;
  description: string;
  pictograms: number[];
}