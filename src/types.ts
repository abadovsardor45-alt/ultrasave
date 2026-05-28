export interface MediaMetadata {
  title: string;
  creator: string;
  platform: 'youtube' | 'instagram' | 'tiktok' | 'facebook' | 'twitter';
  durationSecs: number;
  formattedDuration: string;
  views: string;
  likes: string;
  thumbnailCategory: string;
  description: string;
}

export interface DownloadHistoryItem {
  id: string;
  url: string;
  title: string;
  creator: string;
  platform: 'youtube' | 'instagram' | 'tiktok' | 'facebook' | 'twitter';
  quality: string;
  format: 'mp4' | 'mp3';
  downloadedAt: string;
  thumbnailUrl: string;
}

export interface TrendingItem {
  id: string;
  url: string;
  title: string;
  creator: string;
  platform: 'youtube' | 'instagram' | 'tiktok' | 'facebook' | 'twitter';
  views: string;
  likes: string;
  formattedDuration: string;
  category: string;
  rating?: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}
