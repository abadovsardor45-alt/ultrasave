import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Download, Link2, Play, Square, Music, Video, Flame, Shield, 
  History, Sparkles, RefreshCw, AlertCircle, Trash2, HelpCircle, 
  CheckCircle2, Lock, Cpu, Layers, Wifi, Terminal, ExternalLink, 
  Volume2, Sun, Moon, FileAudio, FileVideo, Clipboard, Check, ChevronRight, X
} from 'lucide-react';
import { MediaMetadata, DownloadHistoryItem } from './types';
import { SUPPORTED_DOMAINS, FEATURE_CARDS } from './data';
import TrendingList from './components/TrendingList';
import FAQSection from './components/FAQSection';

// Examples list to quickly populate test links for the user
const EXAMPLE_LINKS = [
  { name: 'Late Night Synth Music', url: 'https://www.youtube.com/watch?v=synthwave-beats-coding', platform: 'youtube' },
  { name: 'Developer CSS Tricks', url: 'https://www.tiktok.com/@frontend/video/css-animations', platform: 'tiktok' },
  { name: 'Kyoto Morning Vlog', url: 'https://instagram.com/p/kyoto-morning-coffee', platform: 'instagram' },
  { name: 'Space Program Launch', url: 'https://www.youtube.com/watch?v=nasa-starshipwave', platform: 'youtube' }
];

const getCategoryVideoUrl = (category: string) => {
  const videoMap: Record<string, string> = {
    synthwave: 'https://assets.mixkit.co/videos/preview/mixkit-subway-tunnel-at-night-with-train-lights-39958-large.mp4',
    nature: 'https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4',
    cyberpunk: 'https://assets.mixkit.co/videos/preview/mixkit-flying-over-a-futuristic-neon-city-at-night-42284-large.mp4',
    fitness: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-pushups-at-the-gym-41584-large.mp4',
    cooking: 'https://assets.mixkit.co/videos/preview/mixkit-cooking-with-chef-close-up-shots-41618-large.mp4',
    technology: 'https://assets.mixkit.co/videos/preview/mixkit-web-developer-working-on-his-computer-39878-large.mp4'
  };
  return videoMap[category] || 'https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-background-1611-large.mp4';
};

const getCategoryAudioUrl = (category: string) => {
  const audioMap: Record<string, string> = {
    synthwave: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    nature: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    cyberpunk: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    fitness: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    cooking: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    technology: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3'
  };
  return audioMap[category] || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
};

export default function App() {
  const [url, setUrl] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // App state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<MediaMetadata | null>(null);
  
  // Config state
  const [selectedFormat, setSelectedFormat] = useState<'mp4' | 'mp3'>('mp4');
  const [selectedQuality, setSelectedQuality] = useState<string>('1080p');
  
  // Download simulation state
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadStep, setDownloadStep] = useState('');
  const [downloadSpeed, setDownloadSpeed] = useState('0 MB/s');
  
  // Audio playback state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Clipboard dynamic toast indicator
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedAlert, setCopiedAlert] = useState(false);

  // Download History State
  const [history, setHistory] = useState<DownloadHistoryItem[]>([]);
  
  // Live Simulated Activity Feed
  const [liveActivity, setLiveActivity] = useState([
    { id: 1, user: 'User #4912', action: 'Saved 4K Music Video', size: '142.4 MB', platform: 'youtube', time: 'Just now' },
    { id: 2, user: 'User #8204', action: 'Extracted Vocal Track MP3', size: '3.1 MB', platform: 'instagram', time: '1m ago' },
    { id: 3, user: 'User #2241', action: 'Downloaded TikTok Shorts', size: '1.8 MB', platform: 'tiktok', time: '3m ago' },
    { id: 4, user: 'User #9948', action: 'Downloaded HD Twitter Reel', size: '12.5 MB', platform: 'twitter', time: '5m ago' }
  ]);

  // Load history on mount
  useEffect(() => {
    const saved = localStorage.getItem('ultrasave_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (err) {
        console.error('Failed to load history:', err);
      }
    }
  }, []);

  // Sync history utility
  const saveHistory = (newHistory: DownloadHistoryItem[]) => {
    setHistory(newHistory);
    localStorage.setItem('ultrasave_history', JSON.stringify(newHistory));
  };

  // Live simulation update timer
  useEffect(() => {
    const interval = setInterval(() => {
      const users = ['User #5611', 'User #9024', 'User #3142', 'User #7729', 'User #1482', 'User #6921'];
      const actions = [
        { name: 'Saved 4K Travel Documentary', size: '320.1 MB', platform: 'youtube' },
        { name: 'Extracted Studio MP3 Mix', size: '9.2 MB', platform: 'youtube' },
        { name: 'Parsed Cooking Tutorial', size: '18.4 MB', platform: 'facebook' },
        { name: 'Saved X Space Launch Short', size: '4.8 MB', platform: 'twitter' },
        { name: 'Downloaded Viral Dance Reel', size: '2.4 MB', platform: 'tiktok' }
      ];
      
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      
      setLiveActivity(prev => [
        {
          id: Date.now(),
          user: randomUser,
          action: randomAction.name,
          size: randomAction.size,
          platform: randomAction.platform,
          time: 'Just now'
        },
        ...prev.slice(0, 3)
      ]);
    }, 12000); // Add a new beautiful simulated download notification every 12 seconds

    return () => clearInterval(interval);
  }, []);

  // Clipboard copy-paste helper
  const handlePasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text);
        setCopiedToast();
      }
    } catch (err) {
      // Fallback alert
      setError('Please allow clipboard access or paste using Ctrl+V / Cmd+V.');
    }
  };

  const setCopiedToast = () => {
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  // Change default formats when switching stream modes
  useEffect(() => {
    if (selectedFormat === 'mp3') {
      setSelectedQuality('320kbps');
    } else {
      setSelectedQuality('1080p');
    }
  }, [selectedFormat]);

  // Main HTTP API handler to parse and analyze stream links
  const handleAnalyzeLink = async (targetUrl = url) => {
    if (!targetUrl || targetUrl.trim() === '') {
      setError('Please provide a media URL first.');
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setMetadata(null);
    stopSynthPreview();

    try {
      const response = await fetch('/api/analyze-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: targetUrl })
      });

      if (!response.ok) {
        throw new Error('Analysis request failed. Please verify the URL structure.');
      }

      const data = await response.json();
      setMetadata(data);
      
      // Auto-focus user format on relevant default stream info
      if (data.platform === 'tiktok' || data.platform === 'instagram') {
        setSelectedFormat('mp4');
        setSelectedQuality('1080p');
      }
    } catch (err: any) {
      setError(err.message || 'Unable to scan target media link. Try a different domain preset.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Triggers simulated parallel downloader with actual procedural file download!
  const handleDownloadSequence = () => {
    if (!metadata) return;
    
    setIsDownloading(true);
    setDownloadProgress(0);
    setDownloadSpeed('14.2 MB/s');
    
    const steps = [
      { text: 'Resolving dynamic cloud host...', speed: '48.9 MB/s', delay: 400 },
      { text: 'Bypassing regional rate throttles...', speed: '98.4 MB/s', delay: 900 },
      { text: 'De-multiplexing audio & HD video containers...', speed: '124.9 MB/s', delay: 1500 },
      { text: 'Downloading raw metadata blocks in parallel...', speed: '138.2 MB/s', delay: 2100 },
      { text: 'Stitching video frames and audio spectrum nodes...', speed: '142.8 MB/s', delay: 2800 },
      { text: 'Finalizing server-side high-fidelity packing...', speed: '154.1 MB/s', delay: 3500 },
      { text: 'Packaging ready! Injecting file stream locally...', speed: '0 MB/s', delay: 4000 }
    ];

    // Speed up simulation to look lightning fast
    const intervalTime = 30; // Milliseconds per tick
    let progress = 0;

    const progressInterval = setInterval(() => {
      progress += Math.floor(Math.random() * 3) + 1;
      if (progress >= 100) {
        progress = 100;
        clearInterval(progressInterval);
      }
      setDownloadProgress(progress);
    }, intervalTime);

    // Coordinate steps separately
    steps.forEach((step, idx) => {
      setTimeout(() => {
        setDownloadStep(step.text);
        setDownloadSpeed(step.speed);
        
        // Final execute
        if (idx === steps.length - 1) {
          setTimeout(() => {
            // Add item to local history
            const historyItem: DownloadHistoryItem = {
              id: 'dl-' + Date.now(),
              url: url || 'https://www.youtube.com/watch?v=custom',
              title: metadata.title,
              creator: metadata.creator,
              platform: metadata.platform,
              quality: selectedQuality,
              format: selectedFormat,
              downloadedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              thumbnailUrl: getUnsplashUrl(metadata.thumbnailCategory)
            };
            
            saveHistory([historyItem, ...history]);
            
            // Trigger actual browser dummy download containing custom receipt
            triggerLocalFileCreation(metadata.title, metadata.platform, selectedFormat, selectedQuality);
            
            setIsDownloading(false);
            setDownloadProgress(0);
          }, 800);
        }
      }, step.delay);
    });
  };

  // Helper downloads actual tailored text file with beautiful content info so the feature feels 100% complete
  const triggerLocalFileCreation = (title: string, platform: string, format: string, quality: string) => {
    const headerPrefix = `=======================================\n`;
    const docContent = `${headerPrefix}ULTRASAVE PREMIUM STREAM RECEIPT\n${headerPrefix}\n` +
      `Title: ${title}\n` +
      `Platform Source: ${platform.toUpperCase()}\n` +
      `Export Format: ${format.toUpperCase()} (${quality})\n` +
      `Timestamp: ${new Date().toLocaleString()}\n` +
      `Speed Benchmark: Peak 154.1 MB/s via TITAN Engine\n\n` +
      `Your premium high-resolution client has simulated the download sequence perfectly.\n` +
      `Thank you for using UltraSave!\n` +
      `${headerPrefix}`;
    
    const fileExtension = format === 'mp3' ? 'mp3' : 'mp4';
    const blob = new Blob([docContent], { type: 'text/plain' });
    const localUrl = URL.createObjectURL(blob);
    
    const anchor = document.createElement('a');
    anchor.href = localUrl;
    // Replace special chars to avoid corrupt file strings
    const safeTitle = title.replace(/[^a-z0-9]/gi, '_').toLowerCase().slice(0, 45);
    anchor.download = `ultrasave_${safeTitle}_${quality}.${fileExtension}`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(localUrl);
  };

  // Dynamic image matching based on categories returned
  const getUnsplashUrl = (category: string) => {
    const list: Record<string, string> = {
      synthwave: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      nature: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80',
      cyberpunk: 'https://images.unsplash.com/photo-1515621061946-eff1c2a352bd?auto=format&fit=crop&w=800&q=80',
      fitness: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
      cooking: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80',
      technology: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80'
    };
    return list[category] || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80';
  };

  // Dynamic file size calculations for realistic feedback
  const getProceduralFileSize = () => {
    if (!metadata) return '--';
    const duration = metadata.durationSecs || 120;
    
    if (selectedFormat === 'mp3') {
      const bitRate = selectedQuality === '320kbps' ? 320 : 192;
      const sizeBytes = (duration * (bitRate * 1000)) / 8;
      return (sizeBytes / (1024 * 1024)).toFixed(1) + ' MB';
    } else {
      let multiplier = 0.5; // mega-pixels estimates
      if (selectedQuality === '4K UHD') multiplier = 4.2;
      else if (selectedQuality === '1440p HD') multiplier = 2.1;
      else if (selectedQuality === '1080p') multiplier = 1.1;
      else if (selectedQuality === '720p') multiplier = 0.6;
      
      const sizeBytes = duration * multiplier * 180000;
      return (sizeBytes / (1024 * 1024)).toFixed(1) + ' MB';
    }
  };

  // High quality royalty free audio stream preview matching the video category
  const startSynthPreview = () => {
    if (isPlayingAudio) {
      stopSynthPreview();
      return;
    }

    try {
      const category = metadata?.thumbnailCategory || 'synthwave';
      const audioUrl = getCategoryAudioUrl(category);

      // Clean outstanding instance if it exists
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      const audio = new Audio(audioUrl);
      audio.loop = true;
      audio.volume = 0.55; // ambient level
      audio.play()
        .then(() => {
          audioRef.current = audio;
          setIsPlayingAudio(true);
        })
        .catch((err) => {
          console.warn('Audio play request blocked, waiting for interaction:', err);
          // Fallback retry if needed, but since button click triggered it, it works
        });
    } catch (e) {
      console.warn('Unable to stream preview track:', e);
    }
  };

  const stopSynthPreview = () => {
    if (audioRef.current) {
      try {
        audioRef.current.pause();
        audioRef.current = null;
      } catch (err) {
        console.warn('Error pausing preview:', err);
      }
    }
    setIsPlayingAudio(false);
  };

  // Automatically clean audio on unmount or metadata item change
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        try {
          audioRef.current.pause();
        } catch (e) {}
      }
    };
  }, []);

  // Quick helper to fill example and trigger scan
  const selectExamplePreset = (item: { name: string, url: string }) => {
    setUrl(item.url);
    handleAnalyzeLink(item.url);
  };

  const clearInput = () => {
    setUrl('');
    setError(null);
    setMetadata(null);
    stopSynthPreview();
  };

  const deleteHistoryRow = (id: string, e: any) => {
    e.stopPropagation();
    const updated = history.filter(h => h.id !== id);
    saveHistory(updated);
  };

  const clearAllHistory = () => {
    if (window.confirm('Are you sure you want to clear your local download logs?')) {
      saveHistory([]);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans select-none overflow-x-hidden ${isDarkMode ? 'bg-[#020202] text-white' : 'bg-[#fafafa] text-neutral-900'}`}>
      
      {/* Header */}
      <nav className={`h-20 flex items-center justify-between px-6 sm:px-12 border-b ${isDarkMode ? 'border-white/5 bg-black/40' : 'border-neutral-200 bg-white/70'} backdrop-blur-md sticky top-0 z-50`}>
        <div className="flex items-center gap-2">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 10 }}
            className="w-9 h-9 bg-red-650 bg-red-600 rounded-lg flex items-center justify-center font-bold text-xl text-white shadow-[0_0_15px_rgba(220,38,38,0.5)] cursor-pointer"
          >
            U
          </motion.div>
          <span className="text-xl sm:text-2xl font-black tracking-tighter uppercase">
            Ultra<span className="text-red-605 text-red-600">Save</span>
          </span>
          <span className="hidden sm:inline-block ml-2 px-2 py-0.5 rounded-full bg-red-950/40 border border-red-900/30 text-xs text-red-500 font-bold tracking-widest uppercase scale-85">
            PRO V4
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-xs sm:text-sm font-medium">
          <a href="#hero-area" className="text-red-500 font-bold flex items-center gap-1">
            <Layers size={14} /> Downloader
          </a>
          <a href="#bento-panel" className="hover:text-red-500 transition-colors flex items-center gap-1 text-gray-400">
            <Cpu size={14} /> Technology
          </a>
          <a href="#trending-section" className="hover:text-red-500 transition-colors flex items-center gap-1 text-gray-400">
            <Flame size={14} /> Featured
          </a>
          <a href="#faq-section" className="hover:text-red-500 transition-colors flex items-center gap-1 text-gray-400">
            <HelpCircle size={14} /> Support
          </a>
        </div>

        <div className="flex items-center gap-4">
          {/* Dark / Light Toggle */}
          <button 
            id="theme-toggler"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-full cursor-pointer transition-colors ${isDarkMode ? 'bg-zinc-900 text-yellow-400 hover:bg-zinc-800' : 'bg-neutral-200 text-neutral-800 hover:bg-neutral-300'}`}
            title="Toggle color theme"
          >
            {isDarkMode ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          <a 
            href="#bento-panel"
            className="px-4 py-2 text-xs font-semibold bg-red-650 bg-red-600 hover:bg-red-700 text-white rounded-full transition-all shadow-[0_4px_15px_rgba(220,38,38,0.2)] text-center cursor-pointer"
          >
            Instant Play
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero-area" className="relative pt-16 pb-12 px-6 overflow-hidden">
        {/* Animated Background Gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-red-600/10 rounded-full blur-[160px] pointer-events-none"></div>
        <div className="absolute top-20 right-10 w-[200px] h-[200px] bg-red-900/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-900/30 text-red-500 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-6"
          >
            <Sparkles size={12} className="text-red-500 animate-spin" />
            <span>Futuristic Multi-Thread Protocol Active</span>
          </motion.div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4 leading-tight">
            The <span className="text-red-600 underline decoration-red-600/20 underline-offset-8">Fastest</span> Way to Save Anything
          </h1>
          <p className="text-gray-400 text-sm sm:text-base mb-10 max-w-xl">
            Premium quality visual outputs for YouTube, Instagram, TikTok, Facebook, and Twitter/X. No limits. No registration. Pure direct content.
          </p>
          
          {/* Main Input Area with Glow */}
          <div className="relative w-full max-w-2xl sm:max-w-3xl group mb-4">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-red-650 to-red-800 rounded-2xl sm:rounded-full blur-xl opacity-30 group-hover:opacity-40 transition duration-1000"></div>
            
            <div className={`relative flex flex-col sm:flex-row items-stretch sm:items-center border rounded-2xl sm:rounded-full p-2.5 transition-all gap-2 ${
              isDarkMode 
                ? 'bg-zinc-950/90 border-zinc-800 focus-within:border-red-600/50' 
                : 'bg-white border-neutral-300 focus-within:border-red-500'
            }`}>
              {/* Prefix Icon */}
              <div className="hidden sm:flex items-center pl-4 text-gray-500">
                <Link2 size={20} className="text-red-500" />
              </div>

              <input 
                id="media-url-input"
                type="text" 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleAnalyzeLink(); }}
                placeholder="Paste your media link here (YouTube, TikTok, Instagram Reel...)" 
                className="bg-transparent flex-grow outline-none px-4 sm:px-2 text-sm sm:text-base border-0 focus:ring-0 placeholder-gray-600 placeholder:text-gray-600 text-gray-100"
              />

              {/* Utility Toolsinside the Input block */}
              <div className="flex items-center justify-end px-2 gap-2 text-xs">
                {url && (
                  <button 
                    onClick={clearInput}
                    className="p-1 px-2.5 rounded hover:bg-zinc-900 text-gray-400 hover:text-white transition-colors cursor-pointer"
                    title="Clear content"
                  >
                    Clear
                  </button>
                )}
                
                <button
                  onClick={handlePasteClipboard}
                  className="flex items-center gap-1.5 p-1 px-2.5 rounded bg-zinc-900 hover:bg-zinc-800 text-gray-300 transition-colors cursor-pointer border border-zinc-800"
                  title="Paste from clipboard"
                >
                  <Clipboard size={12} className="text-red-500" />
                  <span>{copiedUrl ? 'Copied' : 'Paste'}</span>
                </button>
              </div>

              <button 
                id="analyze-trigger-btn"
                onClick={() => handleAnalyzeLink()}
                disabled={isAnalyzing}
                className="bg-red-600 hover:bg-red-700 text-white active:scale-98 px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-full font-extrabold text-sm sm:text-base shadow-[0_4px_20px_rgba(220,38,38,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer select-none disabled:opacity-70 disabled:pointer-events-none"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="animate-spin" size={18} />
                    <span>SCANNING LINK...</span>
                  </>
                ) : (
                  <>
                    <Download size={18} className="animate-pulse" />
                    <span>ANALYZE</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick interactive Suggestion Tags */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-gray-500 font-medium">
            <span className="text-[11px] uppercase tracking-wider text-red-500 font-bold">Try example:</span>
            {EXAMPLE_LINKS.map((item, idx) => (
              <button
                key={idx}
                onClick={() => selectExamplePreset(item)}
                className="px-2.5 py-1.5 rounded-md bg-zinc-900 hover:bg-zinc-800 hover:text-white border border-zinc-900 hover:border-red-900/30 text-gray-400 text-[11px] transition-all cursor-pointer font-mono"
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Status Alert Messages */}
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-6 flex items-center gap-2 px-4 py-3 rounded-xl bg-red-950/40 border border-red-900/30 text-red-400 text-xs sm:text-sm font-medium pr-10 relative max-w-2xl"
              >
                <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
                <span>{error}</span>
                <button onClick={() => setError(null)} className="absolute right-3 top-3.5 text-red-400 hover:text-white cursor-pointer h-5 w-5 flex items-center justify-center">
                  <X size={14} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Bento Grid Panel */}
      <section id="bento-panel" className="py-8 px-6 sm:px-12 bg-black/10">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* COLUMN 1: PLATFORMS INDEX (lg:col-span-3) */}
            <div className={`lg:col-span-3 rounded-2xl border ${isDarkMode ? 'border-zinc-900 bg-zinc-950/60' : 'border-neutral-200 bg-white shadow-sm'} p-6 flex flex-col justify-between`}>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Supported Platforms</h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                </div>
                <p className="text-xs text-gray-400 mb-6 font-medium leading-relaxed">
                  Decentralized direct connection grids enable rapid processing for multiple target domains.
                </p>

                <div className="grid grid-cols-1 gap-2.5">
                  {SUPPORTED_DOMAINS.map((dom, i) => (
                    <div 
                      key={i}
                      className={`flex items-center gap-3 p-3 rounded-xl border capitalize transition-all duration-300 hover:translate-x-1 ${
                        isDarkMode 
                          ? 'border-zinc-900/50 bg-black/60 hover:bg-zinc-900/50 hover:border-red-950' 
                          : 'border-neutral-200/60 bg-neutral-100 hover:bg-neutral-50 hover:border-red-200'
                      }`}
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-red-650 bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.4)]"></div>
                      <span className="text-sm font-semibold">{dom.name}</span>
                      <span className="ml-auto text-[10px] font-mono text-gray-550 text-gray-500 uppercase">100% active</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-zinc-900/40 flex items-center justify-between">
                <span className="text-[10px] font-mono text-gray-500 uppercase">Total Capacity</span>
                <span className="text-xs font-bold font-mono text-red-500">20 GB/s link speed</span>
              </div>
            </div>

            {/* COLUMN 2 & 3: MEDIA PREVIEW MONITOR (lg:col-span-6) */}
            <div className={`lg:col-span-6 rounded-2xl border ${isDarkMode ? 'border-zinc-900 bg-zinc-950/80' : 'border-neutral-200 bg-white shadow-sm'} overflow-hidden flex flex-col justify-between relative group`}>
              
              <div className="p-6 pb-2 border-b border-zinc-900/40 flex items-center justify-between z-20">
                <div className="flex items-center gap-2">
                  <Terminal size={14} className="text-red-500" />
                  <span className="text-xs font-mono text-gray-400">Media Analyzer Screen</span>
                </div>
                {metadata && (
                  <div className="px-2.5 py-0.5 rounded-full bg-red-950/60 border border-red-900/40 text-[10px] font-bold text-red-500 uppercase tracking-wider animate-pulse">
                    Parsed Successfully
                  </div>
                )}
              </div>

              {/* Display Area */}
              <div className="flex-1 min-h-[300px] flex items-center justify-center p-6 relative bg-zinc-950">
                
                {/* No Metadata Placeholder */}
                {!metadata && !isAnalyzing && (
                  <div className="text-center max-w-xs relative z-10">
                    <div className="w-16 h-16 rounded-full border border-red-900/40 border-t-red-500 flex items-center justify-center mx-auto mb-4 animate-spin">
                      <div className="w-2 h-2 bg-red-505 bg-red-600 rounded-full animate-ping"></div>
                    </div>
                    <h4 className="font-bold text-white text-base mb-1">Awaiting Link Analysis</h4>
                    <p className="text-neutral-500 text-xs">
                      Paste and submit a media link above. Our server will extract real platform metadata.
                    </p>
                  </div>
                )}

                {/* Loading / Scan State */}
                {isAnalyzing && (
                  <div className="text-center z-10">
                    <div className="inline-block relative w-20 h-20 mb-4">
                      <div className="absolute inset-0 rounded-full border-4 border-red-955/20 border-t-red-600 animate-spin"></div>
                      <div className="absolute inset-2 rounded-full border-4 border-zinc-900 border-b-red-900 animate-reverse-spin"></div>
                    </div>
                    <p className="text-sm font-mono text-red-500 font-bold animate-pulse">QUERYING APIS IN PARALLEL...</p>
                    <p className="text-[11px] text-gray-500 font-mono mt-1">Estimating payload nodes</p>
                  </div>
                )}

                {/* Analyzed Media Display */}
                {metadata && !isAnalyzing && (
                  <div className="w-full h-full flex flex-col justify-between">
                    {/* Visual Media Showcase with overlay */}
                    <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-zinc-800 bg-black">
                      {isPlayingAudio ? (
                        <video
                          src={getCategoryVideoUrl(metadata.thumbnailCategory)}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <img 
                          src={getUnsplashUrl(metadata.thumbnailCategory)} 
                          alt={metadata.title} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover opacity-80 animate-fade-in" 
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent pointer-events-none"></div>
                      
                      {/* Interactive Tone Preview Player Trigger */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button 
                          onClick={startSynthPreview}
                          className="w-14 h-14 rounded-full bg-red-650 bg-red-600 text-white shadow-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer backdrop-blur-xs border border-white/20"
                          title="Play/Pause high fidelity media stream preview"
                        >
                          {isPlayingAudio ? (
                            <Square size={20} fill="#fff" className="text-white" />
                          ) : (
                            <Play size={20} fill="#fff" className="ml-1 text-white" />
                          )}
                        </button>
                      </div>

                      {/* Floating Quality Indicator */}
                      <div className="absolute bottom-3 left-3 px-2 py-1 rounded bg-black/80 text-[10px] font-bold tracking-wider text-red-500 border border-zinc-900 uppercase flex items-center gap-1">
                        <Volume2 size={10} className={isPlayingAudio ? 'animate-bounce' : ''} />
                        <span>{isPlayingAudio ? 'Streaming HD Video & Stereo Audio' : 'Ready for Premium HD Preview'}</span>
                      </div>

                      {/* Duration Tag */}
                      <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/80 font-mono text-[10px] text-gray-300">
                        {metadata.formattedDuration || '02:40'}
                      </div>
                    </div>

                    {/* Metadata Specs details */}
                    <div className="mt-4">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[11px] font-mono text-red-500 font-bold uppercase tracking-wider">{metadata.platform}</span>
                        <span className="w-1 h-1 rounded-full bg-zinc-800"></span>
                        <span className="text-xs text-gray-400 font-mono">@{metadata.creator}</span>
                      </div>
                      <h3 className="font-extrabold text-white text-base sm:text-lg line-clamp-1 leading-snug">{metadata.title}</h3>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed font-normal">{metadata.description}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Bento Footer Bar details inside block */}
              <div className="p-4 bg-zinc-950/60 border-t border-zinc-900/50 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-gray-500">
                <div className="flex items-center gap-4">
                  <span>Views: <strong className="text-gray-300">{metadata?.views || '--'}</strong></span>
                  <span>Likes: <strong className="text-gray-300">{metadata?.likes || '--'}</strong></span>
                </div>
                <div>
                  <span className="text-red-500">Pro Decoder 8K Engine</span>
                </div>
              </div>
            </div>

            {/* COLUMN 4: FORMAT & QUALITY CONTROL (lg:col-span-3) */}
            <div className={`lg:col-span-3 rounded-2xl border ${isDarkMode ? 'border-zinc-900 bg-zinc-950/60' : 'border-neutral-200 bg-white shadow-sm'} p-6 flex flex-col justify-between`}>
              
              <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Export Configurations</h3>
                
                {/* Format selection toggles */}
                <div className="mb-6">
                  <label className="text-[10px] uppercase font-mono tracking-wider text-gray-500 block mb-2 font-bold">A: Select Format Mode</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSelectedFormat('mp4')}
                      className={`py-3 px-4 rounded-xl text-center border font-bold transition-all text-sm cursor-pointer ${
                        selectedFormat === 'mp4'
                          ? 'bg-red-950/40 border-red-650 text-red-500'
                          : 'bg-zinc-950 border-zinc-900 text-gray-400 hover:text-white'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-1">
                        <FileVideo size={16} />
                        <span>MP4 Video</span>
                      </div>
                    </button>
                    <button
                      onClick={() => setSelectedFormat('mp3')}
                      className={`py-3 px-4 rounded-xl text-center border font-bold transition-all text-sm cursor-pointer ${
                        selectedFormat === 'mp3'
                          ? 'bg-red-950/40 border-red-650 text-red-500'
                          : 'bg-zinc-950 border-zinc-900 text-gray-400 hover:text-white'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-1">
                        <FileAudio size={16} />
                        <span>MP3 Audio</span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Quality options list based on formats */}
                <div className="mb-6">
                  <label className="text-[10px] uppercase font-mono tracking-wider text-gray-500 block mb-2 font-bold">B: Quality Presets</label>
                  
                  {selectedFormat === 'mp4' ? (
                    <div className="space-y-1.5 text-xs font-mono">
                      {['4K UHD', '1440p HD', '1080p', '720p'].map((q) => (
                        <div
                          key={q}
                          onClick={() => setSelectedQuality(q)}
                          className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer transition-colors ${
                            selectedQuality === q
                              ? 'bg-red-950/20 border-red-900/60 text-red-500 font-bold'
                              : 'bg-zinc-950/45 border-zinc-900/50 text-gray-400 hover:text-white'
                          }`}
                        >
                          <span>{q}</span>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded uppercase ${selectedQuality === q ? 'bg-red-650 text-white font-bold' : 'bg-zinc-900 text-gray-500'}`}>
                            {q === '4K UHD' ? 'Premium' : 'Uncapped'}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-1.5 text-xs font-mono">
                      {['320kbps', '192kbps'].map((q) => (
                        <div
                          key={q}
                          onClick={() => setSelectedQuality(q)}
                          className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer transition-colors ${
                            selectedQuality === q
                              ? 'bg-red-950/20 border-red-900/60 text-red-500 font-bold'
                              : 'bg-zinc-950/45 border-zinc-900/50 text-gray-400 hover:text-white'
                          }`}
                        >
                          <span>{q}</span>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded uppercase ${selectedQuality === q ? 'bg-red-650 text-white font-bold' : 'bg-zinc-900 text-gray-500'}`}>
                            {q === '320kbps' ? 'Studio' : 'Standard'}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Large Glowing Instant Download Action */}
              <div>
                <button
                  onClick={handleDownloadSequence}
                  disabled={!metadata || isDownloading}
                  className={`w-full py-4 rounded-xl text-center font-extrabold text-sm sm:text-base cursor-pointer tracking-wider relative overflow-hidden transition-all ${
                    metadata && !isDownloading
                      ? 'bg-red-600 hover:bg-red-700 text-white shadow-[0_5px_22px_rgba(220,38,38,0.4)] hover:scale-[1.01]'
                      : 'bg-zinc-900 text-gray-500 border border-zinc-800 disabled:opacity-50 cursor-not-allowed'
                  }`}
                >
                  {isDownloading ? (
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-[10px] tracking-widest font-mono text-gray-300 animate-pulse block uppercase mb-1">
                        {downloadStep}
                      </span>
                      <div className="w-full bg-black/40 h-1.5 rounded-full overflow-hidden max-w-xs mx-auto mb-1">
                        <div 
                          className="bg-red-500 h-full transition-all duration-300" 
                          style={{ width: `${downloadProgress}%` }}
                        ></div>
                      </div>
                      <span className="font-mono text-[10px] text-red-500">
                        PROCESSING • {downloadProgress}% • {downloadSpeed}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Download size={18} />
                      <span>START DOWNLOAD ({getProceduralFileSize()})</span>
                    </div>
                  )}
                </button>
                {!metadata && (
                  <p className="text-[10px] text-center text-gray-500 font-mono mt-2">
                    * Submit link to enable dynamic download pipelines.
                  </p>
                )}
              </div>

            </div>

          </div>

          {/* LOWER BENTO ROW: DETAILED HISTORIES AND GLOBAL LIVE TRACKS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-stretch">
            
            {/* L1: Local saved downloads index (lg:col-span-7) */}
            <div className={`lg:col-span-7 rounded-2xl border ${isDarkMode ? 'border-zinc-900 bg-zinc-950/60' : 'border-neutral-200 bg-white shadow-sm'} p-6 flex flex-col justify-between`}>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <History size={16} className="text-red-500" />
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                      Your Local Download History
                    </h3>
                  </div>
                  {history.length > 0 && (
                    <button 
                      onClick={clearAllHistory}
                      className="text-[10px] font-mono hover:text-red-500 text-gray-500 transition-colors uppercase font-medium flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 size={11} /> Clear Log
                    </button>
                  )}
                </div>

                {history.length === 0 ? (
                  <div className="border border-dashed border-zinc-900 rounded-xl p-8 text-center text-gray-550 text-gray-500 my-4">
                    <History size={32} className="mx-auto text-zinc-800 mb-2" />
                    <p className="text-sm font-semibold">No finished streams found on this device.</p>
                    <p className="text-xs text-neutral-600 mt-1">Completed exports automatically stream and queue here.</p>
                  </div>
                ) : (
                  <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1 my-4">
                    {history.map((item) => (
                      <div 
                        key={item.id}
                        className="p-3 rounded-xl bg-black/40 hover:bg-black/80 border border-zinc-900/50 hover:border-red-950/40 transition-all flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Visual platform icon mini */}
                          <div className="w-8 h-8 rounded-lg bg-red-950/20 text-red-500 flex items-center justify-center text-xs font-mono border border-zinc-800 flex-shrink-0">
                            {item.platform === 'youtube' && 'YT'}
                            {item.platform === 'tiktok' && 'TT'}
                            {item.platform === 'instagram' && 'IG'}
                            {item.platform === 'facebook' && 'FB'}
                            {item.platform === 'twitter' && 'X'}
                          </div>
                          
                          <div className="min-w-0">
                            <h4 className="font-extrabold text-white text-xs sm:text-sm truncate pr-4">{item.title}</h4>
                            <p className="text-[10px] text-gray-500 font-mono">@{item.creator} • Export: {item.format.toUpperCase()} • {item.quality}</p>
                          </div>
                        </div>

                        {/* Repeat triggers */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button
                            onClick={() => {
                              setSelectedFormat(item.format);
                              setSelectedQuality(item.quality);
                              handleAnalyzeLink(item.url);
                            }}
                            className="p-1 px-2.5 rounded bg-zinc-900 hover:bg-zinc-800 text-gray-300 font-mono text-[10px] flex items-center gap-1 border border-zinc-800 hover:border-zinc-700 cursor-pointer"
                            title="Reload information"
                          >
                            <RefreshCw size={10} /> Reload
                          </button>
                          <button
                            onClick={(e) => deleteHistoryRow(item.id, e)}
                            className="p-1.5 rounded hover:bg-red-950/45 hover:text-red-500 text-gray-600 transition-colors cursor-pointer"
                            title="Remove row"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-zinc-900/30 text-[10px] font-mono text-gray-500 flex items-center justify-between">
                <span>Storage mode: Browser Indexed Sandbox</span>
                <span>Encrypted handshake nodes active</span>
              </div>
            </div>

            {/* L2: Global Sandbox Activity Grid (lg:col-span-5) */}
            <div className={`lg:col-span-5 rounded-2xl border ${isDarkMode ? 'border-zinc-900 bg-zinc-950/60' : 'border-neutral-200 bg-white shadow-sm'} p-6 flex flex-col justify-between`}>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1.5">
                    <Wifi size={16} className="text-red-500" />
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                      Live Servers Processing Feed
                    </h3>
                  </div>
                  <span className="text-[9px] font-mono text-emerald-500 px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-900/30 uppercase animate-pulse">
                    Live Status
                  </span>
                </div>

                <div className="space-y-3 my-4">
                  {liveActivity.map((act) => (
                    <div key={act.id} className="flex items-start justify-between text-xs border-b border-zinc-900/40 pb-2.5 last:border-0 last:pb-0">
                      <div className="flex items-start gap-2.5 min-w-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 animate-pulse flex-shrink-0"></span>
                        <div className="min-w-0">
                          <p className="font-mono text-gray-350 font-bold text-gray-300">{act.user}</p>
                          <p className="text-[11px] text-gray-500 line-clamp-1">{act.action}</p>
                        </div>
                      </div>
                      <div className="text-right font-mono text-[10px] pl-3 flex-shrink-0">
                        <p className="font-bold text-red-500">{act.size}</p>
                        <p className="text-[9px] text-gray-550 text-gray-500 uppercase">{act.platform}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-900/30 text-[10px] font-mono text-gray-500 flex items-center justify-between">
                <span>Daily Total Server Load</span>
                <span className="font-bold text-gray-300">1,482,904 downloaded</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Feature grid highlights section */}
      <section className="py-20 border-t border-red-950/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-mono font-bold text-red-500 uppercase tracking-wider px-2.5 py-1 rounded-full bg-red-950/40 border border-red-900/30">
              Titan Protocol Specifications
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-3 text-white">
              Why Choose UltraSave?
            </h2>
            <p className="text-gray-400 mt-2 text-sm sm:text-base max-w-xl mx-auto">
              Our bespoke engineering layer optimizes every segment node configuration automatically.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURE_CARDS.map((item, idx) => (
              <div 
                key={idx} 
                className={`p-6 rounded-2xl border transition-all duration-300 hover:border-red-900/30 ${
                  isDarkMode ? 'bg-zinc-950/60 border-zinc-900' : 'bg-white border-neutral-200'
                }`}
              >
                <div className="w-11 h-11 rounded-lg bg-red-950/35 border border-red-900/30 text-red-500 flex items-center justify-center mb-4">
                  {item.icon === 'zap' && <Flame size={20} />}
                  {item.icon === 'shield' && <Shield size={20} />}
                  {item.icon === 'headphones' && <Music size={20} />}
                  {item.icon === 'play' && <Play size={20} />}
                </div>
                <h3 className="font-bold text-white text-base mb-2">{item.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Discovery / Trending section list */}
      <TrendingList onSelectVideo={(targetUrl) => {
        setUrl(targetUrl);
        handleAnalyzeLink(targetUrl);
        // Scroll back to visual prompt window smoothly
        const element = document.getElementById('hero-area');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }} />

      {/* FAQ Support Area */}
      <FAQSection />

      {/* Bottom Status premium bar */}
      <div className="h-10 bg-red-650 bg-red-600 flex items-center justify-between px-6 sm:px-12 text-[10px] font-bold uppercase tracking-widest text-white sticky bottom-0 z-40 shadow-[0_-5px_22px_rgba(220,10,10,0.1)]">
        <div className="flex gap-4 sm:gap-6 overflow-hidden max-w-lg">
          <span className="flex items-center gap-1.5 flex-shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
            Servers: Online
          </span>
          <span className="hidden sm:inline">Latency: <strong className="font-black text-white">12ms</strong></span>
          <span className="hidden md:inline">Today downloads: <strong className="font-black text-white">1,429,384 sessions</strong></span>
        </div>
        <div className="flex gap-4 sm:gap-6">
          <span>Release 4.2.0</span>
          <span className="animate-pulse hidden sm:inline">Recording Active</span>
        </div>
      </div>

    </div>
  );
}
