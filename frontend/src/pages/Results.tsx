import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Plus, Play, Heart, Share, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react'
import MoodSlider from '../components/MoodSlider'
import ContextCard from '../components/ContextCard'

interface Track {
  id: string
  title: string
  artist: string
  album: string
  albumArt: string
  duration: string
  genre: string
}

// Mock data - in real app this would come from API
const mockTracks: Track[] = [
    {
      id: '1',
      title: 'Midnight Vibes',
      artist: 'Lo-Fi Collective',
      album: 'Coding Sessions',
      albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
      duration: '3:24',
      genre: 'Lo-Fi'
    },
    {
      id: '2',
      title: 'Digital Dreams',
      artist: 'Synthwave Studios',
      album: 'Neon Nights',
      albumArt: 'https://images.unsplash.com/photo-1571974599782-87624638275e?w=300&h=300&fit=crop',
      duration: '4:12',
      genre: 'Electronic'
    },
    {
      id: '3',
      title: 'Focus Flow',
      artist: 'Ambient Arts',
      album: 'Deep Work',
      albumArt: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=300&fit=crop',
      duration: '5:03',
      genre: 'Ambient'
    },
    {
      id: '4',
      title: 'Calm Circuits',
      artist: 'Tech Tunes',
      album: 'Binary Beats',
      albumArt: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
      duration: '3:47',
      genre: 'Chillstep'
    },
    {
      id: '5',
      title: 'Code & Coffee',
      artist: 'Study Sounds',
      album: 'Productivity Playlist',
      albumArt: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop',
      duration: '4:35',
      genre: 'Jazz'
    }
  ]

const contextCards = [
    {
      title: "Lo-Fi Hip Hop Origins",
      origin: "Japan & United States",
      year: "1990s-2000s",
      description: "Lo-fi hip hop emerged from the underground hip-hop scene, combining jazz samples with hip-hop beats.",
      culturalContext: "Originally popularized in Japanese cafes and later adopted by students worldwide as the perfect soundtrack for concentration and relaxation."
    },
    {
      title: "Ambient Music Heritage",
      origin: "United Kingdom",
      year: "1970s",
      description: "Pioneered by Brian Eno, ambient music was designed to create atmospheric environments.",
      culturalContext: "Born from the idea that music could be 'as ignorable as it is interesting,' ambient music has become essential for focus and meditation practices."
    }
  ]

export default function Results() {
  const location = useLocation()
  const query = location.state?.query || "chill beats for coding"
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [tracks, setTracks] = useState<Track[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [liked, setLiked] = useState<Set<string>>(new Set())

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setTracks(mockTracks)
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, []) // mockTracks is static, safe to omit

  const handleMoodChange = (energy: number, genre: string) => {
    // In real app, this would trigger new API call
    console.log('Mood changed:', { energy, genre })
  }

  const toggleLike = (trackId: string) => {
    setLiked(prev => {
      const newLiked = new Set(prev)
      if (newLiked.has(trackId)) {
        newLiked.delete(trackId)
      } else {
        newLiked.add(trackId)
      }
      return newLiked
    })
  }

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length)
  }

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-purple-400 border-t-transparent mx-auto mb-4"></div>
          <p className="text-purple-400 font-medium">Finding your perfect tracks...</p>
        </div>
      </div>
    )
  }

  const currentTrack = tracks[currentTrackIndex]

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
            {/* Featured Track Carousel */}
            <div className="bg-slate-800 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Featured Track</h2>
              
              <div className="relative">
                <div className="flex items-center space-x-6">
                  <div className="relative group">
                    <img 
                      src={currentTrack.albumArt} 
                      alt={currentTrack.album}
                      className="w-48 h-48 rounded-2xl object-cover shadow-2xl"
                    />
                    <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full transition-colors">
                        <Play className="h-8 w-8" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">{currentTrack.title}</h3>
                    <p className="text-lg text-slate-300 mb-1">{currentTrack.artist}</p>
                    <p className="text-slate-400 mb-4">{currentTrack.album} • {currentTrack.duration}</p>
                    <div className="inline-block bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full text-sm font-medium mb-6">
                      {currentTrack.genre}
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all flex items-center space-x-2">
                        <Plus className="h-5 w-5" />
                        <span>Add to Playlist</span>
                      </button>
                      
                      <button 
                        onClick={() => toggleLike(currentTrack.id)}
                        className={`p-3 rounded-xl transition-all ${
                          liked.has(currentTrack.id) 
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
                    onClick={prevTrack}
                    className="p-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  
                  <div className="flex space-x-2">
                    {tracks.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentTrackIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          index === currentTrackIndex ? 'bg-purple-500' : 'bg-slate-600'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <button 
                    onClick={nextTrack}
                    className="p-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Track List */}
            <div className="bg-slate-800 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">All Recommendations</h2>
              <div className="space-y-4">
                {tracks.map((track, index) => (
                  <div 
                    key={track.id}
                    className={`flex items-center space-x-4 p-4 rounded-xl transition-all cursor-pointer ${
                      index === currentTrackIndex 
                        ? 'bg-purple-600/20 border border-purple-500' 
                        : 'hover:bg-slate-700'
                    }`}
                    onClick={() => setCurrentTrackIndex(index)}
                  >
                    <img 
                      src={track.albumArt} 
                      alt={track.album}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-white">{track.title}</h4>
                      <p className="text-slate-400">{track.artist} • {track.album}</p>
                    </div>
                    <div className="text-slate-400 text-sm">{track.duration}</div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleLike(track.id)
                      }}
                      className={`p-2 rounded-lg transition-all ${
                        liked.has(track.id) 
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
              onGenreChange={(genre) => handleMoodChange(50, genre)}
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