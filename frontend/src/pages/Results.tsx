import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Plus, Play, Heart, Share, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react'
import MoodSlider from '../components/MoodSlider'
import ContextCard from '../components/ContextCard'

interface Episode {
  id: string
  title: string
  podcastName: string
  host: string
  thumbnail: string
  duration: string
  category: string
  description: string
  publishDate: string
  popularity: number
}

// Mock data - in real app this would come from API
const mockEpisodes: Episode[] = [
    {
      id: '1',
      title: 'The Future of AI in Productivity',
      podcastName: 'Tech Forward',
      host: 'Sarah Chen',
      thumbnail: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=300&h=300&fit=crop',
      duration: '42:30',
      category: 'Technology',
      description: 'Exploring how AI is transforming workplace productivity and the tools that are changing how we work.',
      publishDate: '2024-01-15',
      popularity: 92
    },
    {
      id: '2',
      title: 'Building Resilient Teams',
      podcastName: 'Leadership Insights',
      host: 'Marcus Rodriguez',
      thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop',
      duration: '38:45',
      category: 'Business',
      description: 'Strategies for creating teams that thrive under pressure and adapt to change effectively.',
      publishDate: '2024-01-12',
      popularity: 88
    },
    {
      id: '3',
      title: 'Mindful Morning Routines',
      podcastName: 'Wellness Today',
      host: 'Dr. Emma Thompson',
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop',
      duration: '28:15',
      category: 'Health',
      description: 'How to start your day with intention and create morning habits that boost mental clarity.',
      publishDate: '2024-01-10',
      popularity: 85
    },
    {
      id: '4',
      title: 'The Science of Habit Formation',
      podcastName: 'Psychology Deep Dive',
      host: 'Prof. David Kim',
      thumbnail: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=300&h=300&fit=crop',
      duration: '45:20',
      category: 'Science',
      description: 'Understanding the neurological mechanisms behind habit formation and how to leverage them.',
      publishDate: '2024-01-08',
      popularity: 90
    },
    {
      id: '5',
      title: 'Creative Problem Solving',
      podcastName: 'Innovation Lab',
      host: 'Alex Morgan',
      thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=300&fit=crop',
      duration: '35:50',
      category: 'Education',
      description: 'Techniques and frameworks for approaching complex problems with creativity and systematic thinking.',
      publishDate: '2024-01-05',
      popularity: 87
    }
  ]

const contextCards = [
    {
      title: "Podcast Renaissance",
      origin: "United States",
      year: "2000s-2010s",
      description: "The modern podcast era began with Serial in 2014, revolutionizing how we consume audio content.",
      culturalContext: "From niche hobby to mainstream medium, podcasts have become the go-to format for deep-dive conversations, education, and storytelling in the digital age."
    },
    {
      title: "Talk Radio Evolution",
      origin: "Global",
      year: "1920s-Present",
      description: "Talk radio laid the foundation for today's podcast culture, emphasizing intimate conversation and community.",
      culturalContext: "The transition from broadcast radio to on-demand podcasting has democratized content creation, allowing anyone to become a broadcaster and build communities around shared interests."
    }
  ]

export default function Results() {
  const location = useLocation()
  const query = location.state?.query || "productivity podcasts for focus"
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [liked, setLiked] = useState<Set<string>>(new Set())

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setEpisodes(mockEpisodes)
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, []) // mockEpisodes is static, safe to omit

  const handleMoodChange = (energy: number, category: string) => {
    // In real app, this would trigger new API call
    console.log('Mood changed:', { energy, category })
  }

  const toggleLike = (episodeId: string) => {
    setLiked(prev => {
      const newLiked = new Set(prev)
      if (newLiked.has(episodeId)) {
        newLiked.delete(episodeId)
      } else {
        newLiked.add(episodeId)
      }
      return newLiked
    })
  }

  const nextEpisode = () => {
    setCurrentEpisodeIndex((prev) => (prev + 1) % episodes.length)
  }

  const prevEpisode = () => {
    setCurrentEpisodeIndex((prev) => (prev - 1 + episodes.length) % episodes.length)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-purple-400 border-t-transparent mx-auto mb-4"></div>
          <p className="text-purple-400 font-medium">Finding your perfect episodes...</p>
        </div>
      </div>
    )
  }

  const currentEpisode = episodes[currentEpisodeIndex]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden pt-24">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239333ea' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }} />
      </div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Link 
            to="/discovery"
            className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Discovery</span>
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Perfect Matches for:
          </h1>
          <p className="text-xl text-purple-400 italic">"{query}"</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Featured Episode Carousel */}
            <div className="bg-slate-800 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Featured Episode</h2>
              
              <div className="relative">
                <div className="flex items-center space-x-6">
                  <div className="relative group">
                    <img 
                      src={currentEpisode.thumbnail} 
                      alt={currentEpisode.podcastName}
                      className="w-48 h-48 rounded-2xl object-cover shadow-2xl"
                    />
                    <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full transition-colors">
                        <Play className="h-8 w-8" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">{currentEpisode.title}</h3>
                    <p className="text-lg text-slate-300 mb-1">{currentEpisode.podcastName}</p>
                    <p className="text-slate-400 mb-4">Hosted by {currentEpisode.host} • {currentEpisode.duration}</p>
                    <div className="inline-block bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full text-sm font-medium mb-6">
                      {currentEpisode.category}
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all flex items-center space-x-2">
                        <Plus className="h-5 w-5" />
                        <span>Add to Queue</span>
                      </button>
                      
                      <button 
                        onClick={() => toggleLike(currentEpisode.id)}
                        className={`p-3 rounded-xl transition-all ${
                          liked.has(currentEpisode.id) 
                            ? 'bg-red-600 text-white' 
                            : 'bg-slate-700 text-slate-400 hover:bg-slate-600 hover:text-white'
                        }`}
                      >
                        <Heart className="h-5 w-5" />
                      </button>
                      
                      <button className="p-3 bg-slate-700 hover:bg-slate-600 text-slate-400 hover:text-white rounded-xl transition-all">
                        <Share className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Carousel Controls */}
                <div className="flex justify-between items-center mt-6">
                  <button 
                    onClick={prevEpisode}
                    className="p-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  
                  <div className="flex space-x-2">
                    {episodes.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentEpisodeIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          index === currentEpisodeIndex ? 'bg-purple-500' : 'bg-slate-600'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <button 
                    onClick={nextEpisode}
                    className="p-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Episode List */}
            <div className="bg-slate-800 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">All Recommendations</h2>
              <div className="space-y-4">
                {episodes.map((episode, index) => (
                  <div 
                    key={episode.id}
                    className={`flex items-center space-x-4 p-4 rounded-xl transition-all cursor-pointer ${
                      index === currentEpisodeIndex 
                        ? 'bg-purple-600/20 border border-purple-500' 
                        : 'hover:bg-slate-700'
                    }`}
                    onClick={() => setCurrentEpisodeIndex(index)}
                  >
                    <img 
                      src={episode.thumbnail} 
                      alt={episode.podcastName}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-white">{episode.title}</h4>
                      <p className="text-slate-400">{episode.podcastName} • {episode.host}</p>
                    </div>
                    <div className="text-slate-400 text-sm">{episode.duration}</div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleLike(episode.id)
                      }}
                      className={`p-2 rounded-lg transition-all ${
                        liked.has(episode.id) 
                          ? 'text-red-400 hover:text-red-300' 
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Heart className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Mood Slider */}
            <MoodSlider 
              onEnergyChange={(energy) => handleMoodChange(energy, '')}
              onGenreChange={(category) => handleMoodChange(50, category)}
            />

            {/* Context Cards */}
            <div>
              <h2 className="text-xl font-bold text-white mb-6">Cultural Context</h2>
              <div className="space-y-4">
                {contextCards.map((card, index) => (
                  <ContextCard key={index} {...card} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}