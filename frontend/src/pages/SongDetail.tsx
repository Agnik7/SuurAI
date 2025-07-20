import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { 
  ArrowLeft, Play, Pause, Heart, Plus, Share, Download, 
  Clock, Calendar, Music2, Users, Award, Volume2,
  SkipBack, SkipForward, Repeat, Shuffle
} from 'lucide-react'

interface Track {
  id: string
  title: string
  artist: string
  album: string
  duration: string
  albumArt: string
  genre: string
  year: number
  popularity: number
  bpm?: number
  key?: string
  energy?: number
  danceability?: number
  valence?: number
}

interface SimilarTrack {
  id: string
  title: string
  artist: string
  albumArt: string
  duration: string
}

export default function SongDetail() {
  const location = useLocation()
  const track = location.state?.track as Track
  
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [similarTracks, setSimilarTracks] = useState<SimilarTrack[]>([])

  // Mock similar tracks
  const mockSimilarTracks: SimilarTrack[] = [
    {
      id: '7',
      title: 'Code Flow',
      artist: 'Dev Beats',
      albumArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop',
      duration: '3:45'
    },
    {
      id: '8',
      title: 'Terminal Dreams',
      artist: 'Syntax Sounds',
      albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
      duration: '4:12'
    },
    {
      id: '9',
      title: 'Debugging Zen',
      artist: 'Code & Coffee',
      albumArt: 'https://images.unsplash.com/photo-1571974599782-87624638275e?w=300&h=300&fit=crop',
      duration: '3:58'
    }
  ]

  useEffect(() => {
    setSimilarTracks(mockSimilarTracks)
  }, [])

  useEffect(() => {
    let interval: number
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => Math.min(prev + 1, 222)) // 3:42 = 222 seconds
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const progress = (currentTime / 222) * 100

  if (!track) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Track not found</h2>
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
            <p className="text-slate-400">Track details and controls</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Track Info */}
            <div className="glass-card rounded-3xl p-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-80 flex-shrink-0">
                  <div className="relative group">
                    <img 
                      src={track.albumArt} 
                      alt={track.album}
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
                    <h2 className="text-4xl font-bold text-white mb-2">{track.title}</h2>
                    <p className="text-2xl text-slate-300 mb-4">{track.artist}</p>
                    <p className="text-lg text-slate-400">{track.album} • {track.year}</p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <span className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium border border-purple-500/30">
                      {track.genre}
                    </span>
                    <span className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium border border-blue-500/30 flex items-center space-x-1">
                      <Award className="h-4 w-4" />
                      <span>{track.popularity}% match</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2 text-slate-400">
                      <Clock className="h-4 w-4" />
                      <span>Duration: {track.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-400">
                      <Calendar className="h-4 w-4" />
                      <span>Released: {track.year}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-400">
                      <Music2 className="h-4 w-4" />
                      <span>Genre: {track.genre}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-400">
                      <Users className="h-4 w-4" />
                      <span>Artist: {track.artist}</span>
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
                    <span>{track.duration}</span>
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

                <div className="flex items-center justify-center space-x-3">
                  <Volume2 className="h-5 w-5 text-slate-400" />
                  <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="w-3/4 h-full bg-gradient-to-r from-purple-500 to-blue-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Audio Features */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Audio Features</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl font-bold text-purple-400">85</span>
                  </div>
                  <p className="text-sm text-slate-400">Energy</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl font-bold text-blue-400">72</span>
                  </div>
                  <p className="text-sm text-slate-400">Danceability</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl font-bold text-cyan-400">68</span>
                  </div>
                  <p className="text-sm text-slate-400">Valence</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl font-bold text-green-400">120</span>
                  </div>
                  <p className="text-sm text-slate-400">BPM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Similar Tracks */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Similar Tracks</h3>
              <div className="space-y-4">
                {similarTracks.map((similarTrack) => (
                  <div
                    key={similarTrack.id}
                    className="flex items-center space-x-4 p-4 rounded-xl hover:bg-slate-700/30 transition-all cursor-pointer group"
                  >
                    <div className="relative">
                      <img 
                        src={similarTrack.albumArt} 
                        alt={similarTrack.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Play className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-white truncate">{similarTrack.title}</h4>
                      <p className="text-sm text-slate-400 truncate">{similarTrack.artist}</p>
                    </div>
                    <span className="text-sm text-slate-400">{similarTrack.duration}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Artist Info */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">About the Artist</h3>
              <div className="space-y-4">
                <img 
                  src={`https://ui-avatars.com/api/?name=${track.artist}&background=8b5cf6&color=fff&size=80`}
                  alt={track.artist}
                  className="w-20 h-20 rounded-full mx-auto"
                />
                <div className="text-center">
                  <h4 className="font-bold text-white mb-2">{track.artist}</h4>
                  <p className="text-sm text-slate-400 mb-4">
                    Known for creating ambient and lo-fi tracks perfect for focus and relaxation.
                  </p>
                  <button className="glass-button px-6 py-2 rounded-xl text-slate-300 hover:text-white transition-all">
                    View Artist
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