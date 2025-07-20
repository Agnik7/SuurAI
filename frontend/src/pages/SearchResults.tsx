import { useState, useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { Play, Heart, Plus, Share, Filter, ArrowLeft, Clock, Music2 } from 'lucide-react'

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
  preview_url?: string
}

export default function SearchResults() {
  const location = useLocation()
  const navigate = useNavigate()
  const query = location.state?.query || "chill beats for coding"
  const [tracks, setTracks] = useState<Track[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [liked, setLiked] = useState<Set<string>>(new Set())
  const [sortBy, setSortBy] = useState<'relevance' | 'popularity' | 'duration'>('relevance')
  const [filterGenre, setFilterGenre] = useState<string>('')

  // Mock search results data
  const mockTracks: Track[] = [
    {
      id: '1',
      title: 'Midnight Coding',
      artist: 'Lo-Fi Chronicles',
      album: 'Developer Dreams',
      duration: '3:42',
      albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
      genre: 'Lo-Fi Hip Hop',
      year: 2023,
      popularity: 89
    },
    {
      id: '2',
      title: 'Peaceful Algorithms',
      artist: 'Code & Coffee',
      album: 'Programming Zen',
      duration: '4:15',
      albumArt: 'https://images.unsplash.com/photo-1571974599782-87624638275e?w=300&h=300&fit=crop',
      genre: 'Ambient',
      year: 2024,
      popularity: 76
    },
    {
      id: '3',
      title: 'Focus State',
      artist: 'Digital Harmony',
      album: 'Deep Work Sessions',
      duration: '5:23',
      albumArt: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=300&fit=crop',
      genre: 'Electronic',
      year: 2023,
      popularity: 82
    },
    {
      id: '4',
      title: 'Subtle Rhythms',
      artist: 'Calm Collective',
      album: 'Concentration',
      duration: '3:58',
      albumArt: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
      genre: 'Instrumental',
      year: 2024,
      popularity: 71
    },
    {
      id: '5',
      title: 'Binary Dreams',
      artist: 'Tech Vibes',
      album: 'Code Poetry',
      duration: '4:07',
      albumArt: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop',
      genre: 'Synthwave',
      year: 2023,
      popularity: 85
    },
    {
      id: '6',
      title: 'Quiet Variables',
      artist: 'Programming Sounds',
      album: 'Function Flow',
      duration: '3:29',
      albumArt: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop',
      genre: 'Lo-Fi Hip Hop',
      year: 2024,
      popularity: 78
    }
  ]

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setTracks(mockTracks)
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

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

  const handleTrackClick = (track: Track) => {
    navigate(`/song/${track.id}`, { state: { track } })
  }

  const sortedTracks = [...tracks].sort((a, b) => {
    switch (sortBy) {
      case 'popularity':
        return b.popularity - a.popularity
      case 'duration':
        return a.duration.localeCompare(b.duration)
      default:
        return 0
    }
  })

  const filteredTracks = filterGenre 
    ? sortedTracks.filter(track => track.genre === filterGenre)
    : sortedTracks

  const genres = [...new Set(tracks.map(track => track.genre))]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden pt-24">
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239333ea' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }} />
        </div>
        <div className="relative flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-2 border-purple-400 border-t-transparent mx-auto mb-6"></div>
            <h2 className="text-2xl font-bold text-white mb-2">Searching for music...</h2>
            <p className="text-slate-400">Finding the perfect tracks for "{query}"</p>
          </div>
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
            to="/discovery"
            className="glass-button p-3 rounded-xl text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white">Search Results</h1>
            <p className="text-slate-400">Found {filteredTracks.length} tracks for "{query}"</p>
          </div>
        </div>

        {/* Filters */}
        <div className="glass-card rounded-2xl p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center space-x-4">
              <Filter className="h-5 w-5 text-slate-400" />
              <span className="text-white font-medium">Filters:</span>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'relevance' | 'popularity' | 'duration')}
                className="glass-input px-4 py-2 rounded-lg text-white bg-transparent border border-slate-600"
              >
                <option value="relevance">Sort by Relevance</option>
                <option value="popularity">Sort by Popularity</option>
                <option value="duration">Sort by Duration</option>
              </select>

              <select
                value={filterGenre}
                onChange={(e) => setFilterGenre(e.target.value)}
                className="glass-input px-4 py-2 rounded-lg text-white bg-transparent border border-slate-600"
              >
                <option value="">All Genres</option>
                {genres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>

            <div className="text-sm text-slate-400">
              {filteredTracks.length} of {tracks.length} tracks
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid gap-4">
          {filteredTracks.map((track) => (
            <div
              key={track.id}
              className="group glass-card rounded-2xl p-6 hover:bg-slate-800/50 transition-all duration-500 cursor-pointer transform hover:-translate-y-1"
              onClick={() => handleTrackClick(track)}
            >
              <div className="flex items-center space-x-6">
                <div className="flex-shrink-0 relative">
                  <img 
                    src={track.albumArt} 
                    alt={track.album}
                    className="w-20 h-20 rounded-xl object-cover shadow-lg"
                  />
                  <div className="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Play className="h-8 w-8 text-white" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-white mb-1 truncate">{track.title}</h3>
                  <p className="text-slate-300 mb-2">{track.artist} • {track.album}</p>
                  <div className="flex items-center space-x-4 text-sm text-slate-400">
                    <span className="flex items-center space-x-1">
                      <Music2 className="h-4 w-4" />
                      <span>{track.genre}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{track.duration}</span>
                    </span>
                    <span>{track.year}</span>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>{track.popularity}% match</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleLike(track.id)
                    }}
                    className={`glass-button p-3 rounded-xl transition-all ${
                      liked.has(track.id) 
                        ? 'text-red-400 bg-red-500/10' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Heart className="h-5 w-5" />
                  </button>
                  
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="glass-button p-3 rounded-xl text-slate-400 hover:text-white transition-all"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                  
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="glass-button p-3 rounded-xl text-slate-400 hover:text-white transition-all"
                  >
                    <Share className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTracks.length === 0 && (
          <div className="text-center py-12">
            <Music2 className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No tracks found</h3>
            <p className="text-slate-400">Try adjusting your filters or search for something else.</p>
          </div>
        )}
      </div>
    </div>
  )
}