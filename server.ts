import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import { fileURLToPath } from 'url';

// Resolve directory paths for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API router configuration
  app.post('/api/analyze-link', async (req, res) => {
    const { url } = req.body;
    
    if (!url || typeof url !== 'string') {
      return res.status(400).json({ error: 'Please provide a valid URL.' });
    }

    // Attempt simple regex detection for platforms
    let detectedPlatform = 'youtube';
    const lowerUrl = url.toLowerCase();
    
    if (lowerUrl.includes('youtube.com') || lowerUrl.includes('youtu.be')) {
      detectedPlatform = 'youtube';
    } else if (lowerUrl.includes('instagram.com')) {
      detectedPlatform = 'instagram';
    } else if (lowerUrl.includes('tiktok.com')) {
      detectedPlatform = 'tiktok';
    } else if (lowerUrl.includes('facebook.com') || lowerUrl.includes('fb.watch')) {
      detectedPlatform = 'facebook';
    } else if (lowerUrl.includes('twitter.com') || lowerUrl.includes('x.com')) {
      detectedPlatform = 'twitter';
    } else {
      detectedPlatform = 'youtube'; // Default fallback
    }

    // Procedural Fallback Database for premium details if Gemini is not loaded or fails
    const defaultData = generateProceduralFallback(url, detectedPlatform);

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
      // Return high quality simulated response
      return res.json(defaultData);
    }

    try {
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const systemPrompt = `You are the backend AI for UltraSave, a premium modern downloader.
Given a video or media URL, generate highly realistic and detailed media metadata in JSON format.
Analyze any keywords or parameters within the URL to extract or formulate a super-rich, engaging, and professional video/audio card.
Even if the URL is fake, generate an exciting and relevant title, creator name, short engaging AI summary, and stats (Views, Likes) which align with the target platform.
Provide an appropriate Unsplash-friendly image category name (e.g., 'tech', 'cyberpunk', 'synthwave', 'music-studio', 'indie-music', 'nature', 'city', 'supercar', 'cooking', 'fitness') in 'thumbnailCategory' so we can fetch high quality artwork.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: `Analyze this link: "${url}" for platform: "${detectedPlatform}".`,
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: 'An engaging, high-quality, realistic video or audio title' },
              creator: { type: Type.STRING, description: 'Username, company, or channel creator name' },
              platform: { type: Type.STRING, description: 'youtube, instagram, tiktok, facebook, or twitter' },
              durationSecs: { type: Type.INTEGER, description: 'Approximate length in seconds' },
              formattedDuration: { type: Type.STRING, description: 'Formatted length like "14:20" or "0:45"' },
              views: { type: Type.STRING, description: 'Formatted view count like "1,452,109"' },
              likes: { type: Type.STRING, description: 'Formatted likes like "142K"' },
              thumbnailCategory: { type: Type.STRING, description: 'Unsplash keyword for high quality thumbnail background based on content' },
              description: { type: Type.STRING, description: 'A highly compelling 1-2 sentence description summarizing the video' }
            },
            required: ['title', 'creator', 'platform', 'durationSecs', 'formattedDuration', 'views', 'likes', 'thumbnailCategory', 'description']
          }
        }
      });

      const text = response.text;
      if (text) {
        const parsed = JSON.parse(text);
        return res.json(parsed);
      } else {
        return res.json(defaultData);
      }
    } catch (err) {
      console.warn('Gemini metadata generation failed, using procedural fallback:', err);
      return res.json(defaultData);
    }
  });

  // Helper to generate beautifully realistic fallbacks
  function generateProceduralFallback(url: string, platform: string) {
    const urlObj = url.toLowerCase();
    
    // Pick thematic keyword
    let category = 'tech';
    let title = 'Premium UHD Cinematic Experience';
    let creator = 'CreatorOne';
    let views = '1.2M';
    let likes = '84.2K';
    let durationSecs = 184;
    let formattedDuration = '03:04';
    let description = 'Exploring next-generation aesthetics, premium workflows, and high-fidelity layouts.';

    if (urlObj.includes('music') || urlObj.includes('synth') || urlObj.includes('song') || urlObj.includes('audio')) {
      category = 'synthwave';
      title = 'Late Night Synthwaves for Focused Coding & Study (8D Audio)';
      creator = 'AcousticNights';
      views = '3.5M';
      likes = '240K';
      durationSecs = 4800;
      formattedDuration = '01:20:00';
      description = 'Immerse yourself in clean retro vibes and low-frequency synthesis designed specifically to enhance focus, coding, and relaxed states.';
    } else if (urlObj.includes('nature') || urlObj.includes('travel') || urlObj.includes('adventure') || urlObj.includes('earth')) {
      category = 'nature';
      title = 'Breathtaking 8K HDR Wildlife Odyssey - Deep Into Hidden Forests';
      creator = 'EarthChronicles';
      views = '820K';
      likes = '45K';
      durationSecs = 720;
      formattedDuration = '12:00';
      description = 'Take a calming journey into the world’s most pristine ecosystems, capturing rare animal encounters in ultra-high definitions and acoustic isolation.';
    } else if (urlObj.includes('tech') || urlObj.includes('review') || urlObj.includes('phone') || urlObj.includes('gadget')) {
      category = 'cyberpunk';
      title = 'Unboxing the Next-Generation Holographic Phone - Complete First Look!';
      creator = 'SiliconReviews';
      views = '4.1M';
      likes = '390K';
      durationSecs = 852;
      formattedDuration = '14:12';
      description = 'Reviewing the latest consumer electronics breakthrough featuring real holographic displays, ambient design philosophy, and solid state power cells.';
    } else if (urlObj.includes('gym') || urlObj.includes('workout') || urlObj.includes('fitness') || urlObj.includes('health')) {
      category = 'fitness';
      title = 'The Ultimate 15-Minute Kettlebell Burnout (No Equipment Needed)';
      creator = 'ForgeFitness';
      views = '180K';
      likes = '14K';
      durationSecs = 900;
      formattedDuration = '15:00';
      description = 'A high-intensity, compound metabolic burner with minimal equipment, perfect for boosting baseline endurance and power output from home.';
    } else if (urlObj.includes('food') || urlObj.includes('cook') || urlObj.includes('recipe') || urlObj.includes('kitchen')) {
      category = 'cooking';
      title = 'Authentic Crispy Wood-Fired Neapolitan Pizza (Full Masterclass)';
      creator = 'EpicureanArts';
      views = '2.7M';
      likes = '180K';
      durationSecs = 1145;
      formattedDuration = '19:05';
      description = 'Learn the art of slow-fermented pizza dough hydration, custom san marzano sauce reductions, and oven heat management to yield the ultimate rustic crust.';
    } else {
      // General fallbacks based on platforms
      if (platform === 'youtube') {
        title = 'Building a Modern Fullstack Software Startup in 48 Hours';
        creator = 'CodeUnveiled';
        category = 'tech-studio';
        views = '640K';
        likes = '48K';
        durationSecs = 1450;
        formattedDuration = '24:10';
        description = 'A complete documentary-style developer vlog detailing the architectures, databases, and microservices utilized to deploy a production product.';
      } else if (platform === 'tiktok') {
        title = 'Crazy UI CSS tricks that feel illegal to know 💻🔥';
        creator = 'FrontendWizard';
        category = 'neon-cyber';
        views = '12.4M';
        likes = '1.8M';
        durationSecs = 45;
        formattedDuration = '00:45';
        description = 'Quick interactive styling secrets that immediately elevate visual hierarchy, layout rhythm, and component depth.';
      } else if (platform === 'instagram') {
        title = 'Morning routine of a software engineer living in Tokyo ⛩️☕';
        creator = 'sora_devs';
        category = 'tokyo-night';
        views = '890K';
        likes = '120K';
        durationSecs = 60;
        formattedDuration = '01:00';
        description = 'A quiet, aesthetic overview of standard workflows, artisan filter coffee, and deep-focus early sessions in the heart of Shibuya.';
      } else if (platform === 'facebook') {
        title = 'Why Space Hardware is Built Completely Different than Web Apps';
        creator = 'EngineeringUnbound';
        category = 'aerospace';
        views = '540K';
        likes = '35K';
        durationSecs = 1180;
        formattedDuration = '19:40';
        description = 'An engineering analysis demonstrating safety-critical code systems, cosmic-ray radiation shielding, and redundant processor synchronization.';
      } else if (platform === 'twitter') {
        title = 'Introducing UltraSave: The Zero-Lag Media Utility for SaaS Creators';
        creator = 'UltraSaveHQ';
        category = 'abstract-3d';
        views = '320K';
        likes = '24K';
        durationSecs = 124;
        formattedDuration = '02:04';
        description = 'An elegant motion design showcase exploring our rapid parallel downloading grids and adaptive offline capabilities.';
      }
    }

    return {
      title,
      creator,
      platform,
      durationSecs,
      formattedDuration,
      views,
      likes,
      thumbnailCategory: category,
      description
    };
  }

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[UltraSave-Server] running on port ${PORT}`);
  });
}

startServer();
