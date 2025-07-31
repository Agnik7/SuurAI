import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { 
  ArrowLeft, Play, Pause, Heart, Plus, Share, Download, 
  Clock, Calendar, Radio, Award, Volume2,
  SkipBack, SkipForward, Repeat, Shuffle
} from 'lucide-react'

interface Episode {
  id: string
  title: string
  podcastName: string
  host: string
  description: string
  duration: string
  thumbnail: string
  category: string
  publishDate: string
  popularity: number
  episodeNumber?: number
  season?: number
  topics?: string[]
  difficulty?: string
  episodeType?: 'interview' | 'solo' | 'panel' | 'story'
}

interface SimilarEpisode {
  id: string
  title: string
  podcastName: string
  thumbnail: string
  duration: string
}

export default function EpisodeDetail() {
  const location = useLocation()
  const episode = location.state?.episode as Episode
  
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [similarEpisodes, setSimilarEpisodes] = useState<SimilarEpisode[]>([])

  // Mock similar episodes
  const mockSimilarEpisodes: SimilarEpisode[] = [
    {
      id: '7',
      title: 'Deep Dive into AI Ethics',
      podcastName: 'Tech Talk',
      thumbnail: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=300&h=300&fit=crop',
      duration: '45:30'
    },
    {
      id: '8',
      title: 'The Future of Remote Work',
      podcastName: 'Business Insights',
      thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop',
      duration: '38:15'
    },
    {
      id: '9',
      title: 'Mindfulness in Tech',
      podcastName: 'Wellness Talks',
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop',
      duration: '42:20'
    }
  ]

  useEffect(() => {
    setSimilarEpisodes(mockSimilarEpisodes)
  }, [])

  useEffect(() => {
    let interval: number
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => Math.min(prev + playbackSpeed, 2730)) // 45:30 = 2730 seconds
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, playbackSpeed])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const progress = (currentTime / 2730) * 100

  const speedOptions = [0.75, 1, 1.25, 1.5, 2]

  if (!episode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Episode not found</h2>
          <Link to="/discovery" className="text-purple-400 hover:text-purple-300">
            Go back to discovery
          </Link>
        </div>
      </div>
    )
  }

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
            to="/search-results"
            className="glass-button p-3 rounded-xl text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white">Now Playing</h1>
            <p className="text-slate-400">Episode details and controls</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Episode Info */}
            <div className="glass-card rounded-3xl p-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-80 flex-shrink-0">
                  <div className="relative group">
                    <img 
                      src={episode.thumbnail} 
                      alt={episode.podcastName}
                      className="w-full aspect-square rounded-2xl object-cover shadow-2xl"
                    />
                    <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="bg-purple-600 hover:bg-purple-700 text-white p-6 rounded-full transition-all transform hover:scale-110 shadow-2xl"
                      >
                        {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex-1 space-y-6">
                  <div>
                    <h2 className="text-4xl font-bold text-white mb-2">{episode.title}</h2>
                    <p className="text-2xl text-slate-300 mb-4">{episode.podcastName}</p>
                    <p className="text-lg text-slate-400">Hosted by {episode.host} • {episode.publishDate}</p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <span className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium border border-purple-500/30">
                      {episode.category}
                    </span>
                    <span className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium border border-blue-500/30 flex items-center space-x-1">
                      <Award className="h-4 w-4" />
                      <span>{episode.popularity}% match</span>
                    </span>
                    {episode.episodeType && (
                      <span className="px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-full text-sm font-medium border border-cyan-500/30">
                        {episode.episodeType}
                      </span>
                    )}
                  </div>

                  <div className="text-slate-300 leading-relaxed">
                    <p>{episode.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2 text-slate-400">
                      <Clock className="h-4 w-4" />
                      <span>Duration: {episode.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-400">
                      <Calendar className="h-4 w-4" />
                      <span>Published: {episode.publishDate}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-400">
                      <Radio className="h-4 w-4" />
                      <span>Category: {episode.category}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-400">
                      <Radio className="h-4 w-4" />
                      <span>Host: {episode.host}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setIsLiked(!isLiked)}
                      className={`glass-button p-4 rounded-xl transition-all ${
                        isLiked 
                          ? 'text-red-400 bg-red-500/10 border-red-500/30' 
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Heart className="h-6 w-6" />
                    </button>
                    
                    <button className="glass-button p-4 rounded-xl text-slate-400 hover:text-white transition-all">
                      <Plus className="h-6 w-6" />
                    </button>
                    
                    <button className="glass-button p-4 rounded-xl text-slate-400 hover:text-white transition-all">
                      <Share className="h-6 w-6" />
                    </button>
                    
                    <button className="glass-button p-4 rounded-xl text-slate-400 hover:text-white transition-all">
                      <Download className="h-6 w-6" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Player Controls */}
            <div className="glass-card rounded-2xl p-6">
              <div className="space-y-4">
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-slate-400">
                    <span>{formatTime(currentTime)}</span>
                    <span>{episode.duration}</span>
                  </div>
                  <div className="relative h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="absolute left-0 top-0 h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-1000"
                      style={{ width: `${progress}%` }}
                    />
                    <div 
                      className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg transition-all duration-1000"
                      style={{ left: `calc(${progress}% - 8px)` }}
                    />
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center space-x-6">
                  <button className="glass-button p-3 rounded-xl text-slate-400 hover:text-white transition-all">
                    <Shuffle className="h-5 w-5" />
                  </button>
                  
                  <button className="glass-button p-3 rounded-xl text-slate-400 hover:text-white transition-all">
                    <SkipBack className="h-6 w-6" />
                  </button>
                  
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="relative bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white p-4 rounded-full transition-all duration-300 transform hover:scale-110 shadow-xl"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-lg opacity-50"></div>
                    {isPlaying ? <Pause className="h-8 w-8 relative z-10" /> : <Play className="h-8 w-8 relative z-10" />}
                  </button>
                  
                  <button className="glass-button p-3 rounded-xl text-slate-400 hover:text-white transition-all">
                    <SkipForward className="h-6 w-6" />
                  </button>
                  
                  <button className="glass-button p-3 rounded-xl text-slate-400 hover:text-white transition-all">
                    <Repeat className="h-5 w-5" />
                  </button>
                </div>

                {/* Playback Speed & Volume */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-slate-400">Speed:</span>
                    <div className="flex space-x-1">
                      {speedOptions.map((speed) => (
                        <button
                          key={speed}
                          onClick={() => setPlaybackSpeed(speed)}
                          className={`px-3 py-1 rounded-lg text-sm transition-all ${
                            playbackSpeed === speed
                              ? 'bg-purple-600 text-white'
                              : 'glass-button text-slate-400 hover:text-white'
                          }`}
                        >
                          {speed}x
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Volume2 className="h-5 w-5 text-slate-400" />
                    <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="w-3/4 h-full bg-gradient-to-r from-purple-500 to-blue-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Episode Features */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Episode Details</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl font-bold text-purple-400">{episode.episodeNumber || 'N/A'}</span>
                  </div>
                  <p className="text-sm text-slate-400">Episode</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl font-bold text-blue-400">{episode.season || 'N/A'}</span>
                  </div>
                  <p className="text-sm text-slate-400">Season</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-lg font-bold text-cyan-400">{episode.difficulty || 'Med'}</span>
                  </div>
                  <p className="text-sm text-slate-400">Difficulty</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-lg font-bold text-green-400">{episode.topics?.length || 0}</span>
                  </div>
                  <p className="text-sm text-slate-400">Topics</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Similar Episodes */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Similar Episodes</h3>
              <div className="space-y-4">
                {similarEpisodes.map((similarEpisode) => (
                  <div
                    key={similarEpisode.id}
                    className="flex items-center space-x-4 p-4 rounded-xl hover:bg-slate-700/30 transition-all cursor-pointer group"
                  >
                    <div className="relative">
                      <img 
                        src={similarEpisode.thumbnail} 
                        alt={similarEpisode.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Play className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-white truncate">{similarEpisode.title}</h4>
                      <p className="text-sm text-slate-400 truncate">{similarEpisode.podcastName}</p>
                    </div>
                    <span className="text-sm text-slate-400">{similarEpisode.duration}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Podcast Info */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">About the Podcast</h3>
              <div className="space-y-4">
                <img 
                  src={`https://ui-avatars.com/api/?name=${episode.podcastName}&background=8b5cf6&color=fff&size=80`}
                  alt={episode.podcastName}
                  className="w-20 h-20 rounded-full mx-auto"
                />
                <div className="text-center">
                  <h4 className="font-bold text-white mb-2">{episode.podcastName}</h4>
                  <p className="text-sm text-slate-400 mb-4">
                    Hosted by {episode.host}. Expert insights and engaging conversations in {episode.category.toLowerCase()}.
                  </p>
                  <button className="glass-button px-6 py-2 rounded-xl text-slate-300 hover:text-white transition-all">
                    View Podcast
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}