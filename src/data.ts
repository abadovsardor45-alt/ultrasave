import { FAQItem, TrendingItem } from './types';

export const SUPPORTED_DOMAINS = [
  { name: 'YouTube', icon: 'youtube', color: 'bg-[#FF0000]/10 text-[#FF0000] border-[#FF0000]/20' },
  { name: 'Instagram', icon: 'instagram', color: 'bg-[#E1306C]/10 text-[#E1306C] border-[#E1306C]/20' },
  { name: 'TikTok', icon: 'tiktok', color: 'bg-[#00F2FE]/10 text-[#00F2FE] border-[#00F2FE]/20' },
  { name: 'Facebook', icon: 'facebook', color: 'bg-[#1877F2]/10 text-[#1877F2] border-[#1877F2]/20' },
  { name: 'Twitter / X', icon: 'twitter', color: 'bg-[#1DA1F2]/10 text-[#1DA1F2] border-[#1DA1F2]/20' }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'How do I download videos or audio using UltraSave?',
    answer: 'Simply copy the video or audio link from YouTube, Instagram, TikTok, Facebook, or Twitter/X. Paste it into the glowing link field at the top of UltraSave, click "Analyze", choose your format (MP4 high-resolution or MP3 high-quality audio), select your quality preference, and click "Start Download".'
  },
  {
    question: 'Are there any limits on the number of downloads?',
    answer: 'Absolutely none! UltraSave is completely free, unlimited, and does not require registration or credentials. You can process and download as many streams as you need.'
  },
  {
    question: 'Does UltraSave support extracting pure audio to MP3?',
    answer: 'Yes! Our high-performance parallel system parses audio tracks directly from sources, outputting clean, full-spectrum 320kbps MP3 files for offline listening.'
  },
  {
    question: 'Can I download full HD and 4K quality videos?',
    answer: 'Certainly. When available on the host platform, our HD quality selector lets you save streams in full raw clarity, such as 1080p, 1440p, or 4K, utilizing high-grade dynamic multiplexing.'
  },
  {
    question: 'Is it safe to use UltraSave on my mobile device?',
    answer: 'Yes. UltraSave features a fully responsive, mobile-first design optimized for cellular connections and touch UI. Your media processes completely server-side, protecting your mobile device from high processor strains.'
  }
];

export const FEATURE_CARDS = [
  {
    title: 'Multi-Thread Grids',
    description: 'Bypasses standard bottleneck protocols, pulling chunks in parallel for up to 10x faster local assemblies.',
    icon: 'zap',
  },
  {
    title: 'HD & 4K Integration',
    description: 'Pristine details preserved perfectly. Choose from 480p up to full HDR resolution streams with smart visual previews.',
    icon: 'shield',
  },
  {
    title: 'Studio MP3 Encoder',
    description: 'Extract absolute clarity. Automatic high-fidelity tagging, vocal isolation, and adaptive audio compression guides.',
    icon: 'headphones',
  },
  {
    title: 'Interactive Playback',
    description: 'Preview files directly inside a premium cinematic player before starting the final download sequence.',
    icon: 'play',
  }
];

export const TRENDING_ITEMS: TrendingItem[] = [
  {
    id: 'trend-yt-1',
    url: 'https://www.youtube.com/watch?v=tech-vibe-3038',
    title: 'Late Night Synthwaves for Focused Coding & Deep Work',
    creator: 'RetroSilicon',
    platform: 'youtube',
    views: '4.8M',
    likes: '340K',
    formattedDuration: '01:24:10',
    category: 'synthwave'
  },
  {
    id: 'trend-tik-1',
    url: 'https://tiktok.com/@developer_daily/video/css-secrets-771',
    title: 'Mind-blowing CSS scrolling animations that look completely illegal',
    creator: 'DailyFrontend',
    platform: 'tiktok',
    views: '1.2M',
    likes: '142K',
    formattedDuration: '00:52',
    category: 'code'
  },
  {
    id: 'trend-insta-1',
    url: 'https://instagram.com/p/morning_in_kyoto_vlog',
    title: 'Morning routine of a developer studying in historic Kyoto Kyoto Kyoto',
    creator: 'sora_travels',
    platform: 'instagram',
    views: '940K',
    likes: '84K',
    formattedDuration: '01:00',
    category: 'japan'
  },
  {
    id: 'trend-yt-2',
    url: 'https://www.youtube.com/watch?v=epic-space-shuttle-launch',
    title: 'Why Space Hardware Coding is Built Completely Different than SaaS',
    creator: 'OrbitAstro',
    platform: 'youtube',
    views: '750K',
    likes: '48K',
    formattedDuration: '18:50',
    category: 'technology'
  },
  {
    id: 'trend-fb-1',
    url: 'https://facebook.com/watch/nature_odyssey_hidden_rainforests',
    title: 'Inside the Hidden Redwood Forest Sanctuary - Deep 8K Walk',
    creator: 'EarthOdyssey',
    platform: 'facebook',
    views: '3.1M',
    likes: '190K',
    formattedDuration: '14:20',
    category: 'nature'
  },
  {
    id: 'trend-x-1',
    url: 'https://x.com/UltraSaveHQ/status/introducing_our_parallel_downloader',
    title: 'Introducing UltraSave: The zero-lag multi-threaded download protocol',
    creator: 'UltraSaveHQ',
    platform: 'twitter',
    views: '120K',
    likes: '18K',
    formattedDuration: '02:04',
    category: 'news'
  }
];
