import { motion } from 'motion/react';
import { Play, Flame, Heart, Eye, ArrowRight, Video, Music, Sparkles } from 'lucide-react';
import { TRENDING_ITEMS } from '../data';
import { TrendingItem } from '../types';

interface TrendingListProps {
  onSelectVideo: (url: string) => void;
}

export default function TrendingList({ onSelectVideo }: TrendingListProps) {
  
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'youtube':
        return <span className="text-[#FF0000] font-bold text-xs">YT</span>;
      case 'tiktok':
        return <span className="text-[#00F2FE] font-bold text-xs">TT</span>;
      case 'instagram':
        return <span className="text-[#E1306C] font-bold text-xs">IG</span>;
      case 'facebook':
        return <span className="text-[#1877F2] font-bold text-xs">FB</span>;
      case 'twitter':
        return <span className="text-white font-bold text-xs">X</span>;
      default:
        return null;
    }
  };

  const getPlatformImageUrl = (category: string) => {
    // Return stunning dark creative wallpapers for simulated video preview thumbnails
    const mapping: Record<string, string> = {
      synthwave: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
      code: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
      japan: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80',
      technology: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
      nature: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=600&q=80',
      news: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=600&q=80'
    };
    return mapping[category] || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80';
  };

  return (
    <section id="trending-section" className="py-20 border-t border-red-950/20 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-900/30 text-red-500 text-xs font-semibold uppercase tracking-wider mb-3">
              <Flame size={14} className="text-red-500" />
              <span>Trending Live</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Discover <span className="text-red-600 bg-clip-text">Popular Media</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base mt-2 max-w-xl">
              Quickly test the UltraSave multi-thread architecture with our curated popular links list.
            </p>
          </div>
          
          <div className="text-xs font-mono text-gray-500 mt-4 sm:mt-0 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span>Real-time platform connection active</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TRENDING_ITEMS.map((item: TrendingItem, idx: number) => {
            const isAudio = item.category === 'synthwave';
            return (
              <motion.div
                id={`trending-card-${item.id}`}
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative flex flex-col rounded-2xl border border-zinc-900 bg-zinc-950 overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl hover:border-red-900/30 transition-all duration-300"
                onClick={() => onSelectVideo(item.url)}
              >
                {/* Visual Thumbnail */}
                <div className="relative aspect-video w-full overflow-hidden bg-zinc-900">
                  <img
                    src={getPlatformImageUrl(item.category)}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover opacity-70 group-hover:opacity-90 transition-all duration-500 group-hover:scale-110"
                  />
                  
                  {/* Neon Hue Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                  
                  {/* Media Type Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-zinc-800 text-[10px] font-semibold uppercase tracking-wider text-white">
                    {isAudio ? <Music size={10} className="text-red-500" /> : <Video size={10} className="text-red-500" />}
                    <span>{isAudio ? 'MP3 Audio' : 'MP4 Video'}</span>
                  </div>

                  {/* Platform Indicator */}
                  <div className="absolute top-3 right-3 flex items-center justify-center p-1.5 rounded-lg bg-zinc-950/90 border border-zinc-800 text-[10px] font-mono capitalize">
                    {getPlatformIcon(item.platform)}
                    <span className="ml-1 text-[10px] text-gray-400 font-bold uppercase">{item.platform}</span>
                  </div>

                  {/* Play Glow Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-600 text-white shadow-lg shadow-red-600/50 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <Play size={20} fill="currentColor" className="ml-0.5 text-white" />
                    </div>
                  </div>

                  {/* Time Badge */}
                  <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/80 font-mono text-[10px] text-gray-300">
                    {item.formattedDuration}
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex-1 p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono text-gray-500">@{item.creator}</span>
                      <span className="w-1 h-1 rounded-full bg-zinc-800"></span>
                      <span className="text-xs font-mono text-xs text-red-500 font-medium capitalize flex items-center gap-1">
                        <Sparkles size={10} />
                        {item.category}
                      </span>
                    </div>
                    
                    <h3 className="font-bold text-white text-sm sm:text-base leading-snug group-hover:text-red-500 transition-colors duration-200 line-clamp-2">
                      {item.title}
                    </h3>
                  </div>

                  {/* Stats & Click-to-action */}
                  <div className="mt-4 pt-4 border-t border-zinc-900 flex items-center justify-between text-xs text-gray-400 font-mono">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Eye size={12} className="text-gray-500" />
                        {item.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart size={12} className="text-gray-500" />
                        {item.likes}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-red-500 font-semibold group-hover:translate-x-1 transition-transform duration-300">
                      <span>Download</span>
                      <ArrowRight size={12} />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
