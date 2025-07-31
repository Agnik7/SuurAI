import { useState, useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { Play, Heart, Plus, Share, Filter, ArrowLeft, Radio, Users } from 'lucide-react'
import AudioPlayer from '../components/AudioPlayer'
import podcastAPI, { PodcastRecommendation } from '../services/api'

interface Episode {
  id: string
  name: string
  description: string
  duration_ms: number
  release_date: string
  audio_preview_url?: string
}

interface Podcast {
  id: string
  name: string
  image: string
  description: string
  publisher: string
  category?: string
  episodeCount?: number
  popularity?: number
  episodes?: Episode[]
  images?: Array<{url: string, height: number, width: number}>
}

export default function SearchResults() {
  const location = useLocation()
  const navigate = useNavigate()
  const query = location.state?.query || "productivity podcasts for developers"
  const [podcasts, setPodcasts] = useState<Podcast[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [liked, setLiked] = useState<Set<string>>(new Set())
  const [sortBy, setSortBy] = useState<'relevance' | 'popularity' | 'episodes'>('relevance')
  const [filterCategory, setFilterCategory] = useState<string>('')
  const [currentlyPlaying, setCurrentlyPlaying] = useState<{episodeId: string, title: string, podcastName: string, audioUrl: string} | null>(null)

  const transformPodcastData = (recommendations: PodcastRecommendation[]): Podcast[] => {
    console.log('Transforming recommendations:', recommendations)
    
    if (!Array.isArray(recommendations)) {
      console.error('Expected array but got:', typeof recommendations, recommendations)
      return []
    }
    
    return recommendations.map((rec, index) => {
      console.log(`Processing recommendation ${index}:`, rec)
      
      // Handle QLOO entity structure
      const name = rec.name || `Podcast ${index + 1}`
      const description = rec.properties?.description || 'No description available'
      const publisher = rec.properties?.channel || 'Unknown Publisher'
      const imageUrl = rec.properties?.image?.url || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop'
      const episodeCount = parseInt(rec.properties?.episode_count) || Math.floor(Math.random() * 50) + 10
      const popularityScore = rec.popularity ? Math.round(rec.popularity * 100) : Math.floor(Math.random() * 40) + 60
      
      return {
        id: rec.entity_id || `podcast-${index}`,
        name: name,
        image: imageUrl,
        description: description,
        publisher: publisher,
        category: 'Podcast', // QLOO doesn't seem to provide category
        episodeCount: episodeCount,
        popularity: popularityScore,
        images: rec.properties?.image ? [rec.properties.image] : undefined
      }
    })
  }

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        setIsLoading(true)
        setError(null)
        console.log('Fetching podcasts for query:', query)
        const recommendations = await podcastAPI.searchPodcasts(query)
        console.log('Received recommendations:', recommendations)
        const transformedPodcasts = transformPodcastData(recommendations)
        console.log('Transformed podcasts:', transformedPodcasts)
        setPodcasts(transformedPodcasts)
      } catch (err) {
        console.error('Failed to fetch podcasts:', err)
        console.log('Using fallback mock data due to API error')
        
        // Temporary fallback to mock data while debugging API
        const mockRecommendations: PodcastRecommendation[] = [
          {
            name: 'Tech Talk Daily',
            description: 'Daily discussions about the latest in technology',
            publisher: 'Tech Media',
            images: [{ url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop', height: 400, width: 400 }]
          },
          {
            name: 'Developer Stories',
            description: 'Stories from software developers around the world',
            publisher: 'Dev Network',
            images: [{ url: 'https://images.unsplash.com/photo-1571974599782-87624638275e?w=400&h=400&fit=crop', height: 400, width: 400 }]
          }
        ]
        
        const fallbackPodcasts = transformPodcastData(mockRecommendations)
        setPodcasts(fallbackPodcasts)
        setError(`API temporarily unavailable. Showing sample data. Error: ${err instanceof Error ? err.message : 'Unknown error'}`)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPodcasts()
  }, [query])

  const toggleLike = (podcastId: string) => {
    setLiked(prev => {
      const newLiked = new Set(prev)
      if (newLiked.has(podcastId)) {
        newLiked.delete(podcastId)
      } else {
        newLiked.add(podcastId)
      }
      return newLiked
    })
  }

  const handlePodcastClick = (podcast: Podcast) => {
    navigate(`/podcast/${podcast.id}`, { state: { podcastName: podcast.name, podcastImage: podcast.image } })
  }

  const playEpisode = (episode: Episode, podcastName: string) => {
    // For now, we'll use a placeholder audio URL since episodes don't have direct audio URLs from search
    setCurrentlyPlaying({
      episodeId: episode.id,
      title: episode.name,
      podcastName: podcastName,
      audioUrl: episode.audio_preview_url || 'https://example.com/placeholder-audio.mp3'
    })
  }

  const sortedPodcasts = [...podcasts].sort((a, b) => {
    switch (sortBy) {
      case 'popularity':
        return (b.popularity || 0) - (a.popularity || 0)
      case 'episodes':
        return (b.episodeCount || 0) - (a.episodeCount || 0)
      default:
        return 0
    }
  })

  const filteredPodcasts = filterCategory 
    ? sortedPodcasts.filter(podcast => podcast.category === filterCategory)
    : sortedPodcasts

  const categories = [...new Set(podcasts.map(podcast => podcast.category).filter(Boolean))]

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
            <h2 className="text-2xl font-bold text-white mb-2">Searching for podcasts...</h2>
            <p className="text-slate-400">Finding the perfect episodes for "{query}"</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden pt-24">
        <div className="relative flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-red-400 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-white mb-2">Something went wrong</h2>
            <p className="text-slate-400 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl transition-colors"
            >
              Try Again
            </button>
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
            <p className="text-slate-400">Found {filteredPodcasts.length} podcasts for "{query}"</p>
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
                onChange={(e) => setSortBy(e.target.value as 'relevance' | 'popularity' | 'episodes')}
                className="glass-input px-4 py-2 rounded-lg text-white bg-transparent border border-slate-600"
              >
                <option value="relevance">Sort by Relevance</option>
                <option value="popularity">Sort by Popularity</option>
                <option value="episodes">Sort by Episodes</option>
              </select>

              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="glass-input px-4 py-2 rounded-lg text-white bg-transparent border border-slate-600"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="text-sm text-slate-400">
              {filteredPodcasts.length} of {podcasts.length} podcasts
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid gap-4">
          {filteredPodcasts.map((podcast) => (
            <div
              key={podcast.id}
              className="group glass-card rounded-2xl p-6 hover:bg-slate-800/50 transition-all duration-500 cursor-pointer transform hover:-translate-y-1"
              onClick={() => handlePodcastClick(podcast)}
            >
              <div className="flex items-center space-x-6">
                <div className="flex-shrink-0 relative">
                  <img 
                    src={podcast.image} 
                    alt={podcast.name}
                    className="w-20 h-20 rounded-xl object-cover shadow-lg"
                  />
                  <div className="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Play className="h-8 w-8 text-white" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-white mb-1 truncate">{podcast.name}</h3>
                  <p className="text-slate-300 mb-2">{podcast.publisher}</p>
                  <p className="text-slate-400 text-sm mb-3 line-clamp-2">{podcast.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-slate-400">
                    <span className="flex items-center space-x-1">
                      <Radio className="h-4 w-4" />
                      <span>{podcast.category}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{podcast.episodeCount || 0} episodes</span>
                    </span>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>{podcast.popularity || 0}% match</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center space-y-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      // For now, create a mock episode since we don't have episodes in search results
                      const mockEpisode: Episode = {
                        id: 'mock-1',
                        name: 'Latest Episode',
                        description: 'Latest episode preview',
                        duration_ms: 2400000,
                        release_date: new Date().toISOString(),
                        audio_preview_url: 'https://example.com/preview.mp3'
                      }
                      playEpisode(mockEpisode, podcast.name)
                    }}
                    className="glass-button p-3 rounded-xl text-slate-400 hover:text-white hover:bg-purple-600/20 transition-all"
                    title="Play preview"
                  >
                    <Play className="h-5 w-5" />
                  </button>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleLike(podcast.id)
                      }}
                      className={`glass-button p-3 rounded-xl transition-all ${
                        liked.has(podcast.id) 
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
            </div>
          ))}
        </div>

        {filteredPodcasts.length === 0 && !isLoading && !error && (
          <div className="text-center py-12">
            <Radio className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No podcasts found</h3>
            <p className="text-slate-400">Try adjusting your filters or search for something else.</p>
          </div>
        )}
      </div>

      {/* Audio Player */}
      {currentlyPlaying && (
        <AudioPlayer
          episodeId={currentlyPlaying.episodeId}
          title={currentlyPlaying.title}
          podcastName={currentlyPlaying.podcastName}
          audioUrl={currentlyPlaying.audioUrl}
          onClose={() => setCurrentlyPlaying(null)}
        />
      )}
    </div>
  )
}