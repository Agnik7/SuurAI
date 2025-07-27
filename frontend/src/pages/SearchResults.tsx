import { useState, useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { Play, Heart, Plus, Share, Filter, ArrowLeft, Clock, Mic } from 'lucide-react'

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

export default function SearchResults() {
  const location = useLocation()
  const navigate = useNavigate()
  const query = location.state?.query || "productivity podcasts for developers"
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [liked, setLiked] = useState<Set<string>>(new Set())
  const [sortBy, setSortBy] = useState<'relevance' | 'popularity' | 'duration'>('relevance')
  const [filterCategory, setFilterCategory] = useState<string>('')

  // Mock search results data
  const mockEpisodes: Episode[] = [
    {
      id: '1',
      title: 'Deep Work Strategies for Developers',
      podcastName: 'The Productive Programmer',
      host: 'Alex Chen',
      thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
      duration: '42:30',
      category: 'Technology',
      description: 'Exploring techniques for maintaining focus during coding sessions.',
      publishDate: '2024-01-15',
      popularity: 89
    },
    {
      id: '2',
      title: 'Mindful Coding Practices',
      podcastName: 'Zen and the Art of Programming',
      host: 'Sarah Martinez',
      thumbnail: 'https://images.unsplash.com/photo-1571974599782-87624638275e?w=300&h=300&fit=crop',
      duration: '38:45',
      category: 'Wellness',
      description: 'How to maintain mental clarity while writing code.',
      publishDate: '2024-01-12',
      popularity: 76
    },
    {
      id: '3',
      title: 'Building Better Software Teams',
      podcastName: 'Engineering Leadership',
      host: 'Michael Johnson',
      thumbnail: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=300&fit=crop',
      duration: '52:23',
      category: 'Business',
      description: 'Strategies for creating high-performing development teams.',
      publishDate: '2024-01-10',
      popularity: 82
    },
    {
      id: '4',
      title: 'The Science of Learning to Code',
      podcastName: 'Developer Psychology',
      host: 'Dr. Emma Wilson',
      thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
      duration: '35:58',
      category: 'Education',
      description: 'Understanding how the brain learns programming concepts.',
      publishDate: '2024-01-08',
      popularity: 71
    },
    {
      id: '5',
      title: 'Startup Stories: From Code to IPO',
      podcastName: 'Entrepreneur Tech Tales',
      host: 'David Kim',
      thumbnail: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop',
      duration: '41:07',
      category: 'Business',
      description: 'How developers became successful startup founders.',
      publishDate: '2024-01-05',
      popularity: 85
    },
    {
      id: '6',
      title: 'Clean Code Principles',
      podcastName: 'Code Quality Matters',
      host: 'Jennifer Lopez',
      thumbnail: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop',
      category: 'Technology',
      duration: '33:29',
      description: 'Writing maintainable and readable code that lasts.',
      publishDate: '2024-01-03',
      popularity: 78
    }
  ]

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setEpisodes(mockEpisodes)
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

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

  const handleEpisodeClick = (episode: Episode) => {
    navigate(`/episode/${episode.id}`, { state: { episode } })
  }

  const sortedEpisodes = [...episodes].sort((a, b) => {
    switch (sortBy) {
      case 'popularity':
        return b.popularity - a.popularity
      case 'duration':
        return a.duration.localeCompare(b.duration)
      default:
        return 0
    }
  })

  const filteredEpisodes = filterCategory 
    ? sortedEpisodes.filter(episode => episode.category === filterCategory)
    : sortedEpisodes

  const categories = [...new Set(episodes.map(episode => episode.category))]

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
            <p className="text-slate-400">Found {filteredEpisodes.length} episodes for "{query}"</p>
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
              {filteredEpisodes.length} of {episodes.length} episodes
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid gap-4">
          {filteredEpisodes.map((episode) => (
            <div
              key={episode.id}
              className="group glass-card rounded-2xl p-6 hover:bg-slate-800/50 transition-all duration-500 cursor-pointer transform hover:-translate-y-1"
              onClick={() => handleEpisodeClick(episode)}
            >
              <div className="flex items-center space-x-6">
                <div className="flex-shrink-0 relative">
                  <img 
                    src={episode.thumbnail} 
                    alt={episode.podcastName}
                    className="w-20 h-20 rounded-xl object-cover shadow-lg"
                  />
                  <div className="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Play className="h-8 w-8 text-white" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-white mb-1 truncate">{episode.title}</h3>
                  <p className="text-slate-300 mb-2">{episode.podcastName} • {episode.host}</p>
                  <div className="flex items-center space-x-4 text-sm text-slate-400">
                    <span className="flex items-center space-x-1">
                      <Mic className="h-4 w-4" />
                      <span>{episode.category}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{episode.duration}</span>
                    </span>
                    <span>{new Date(episode.publishDate).getFullYear()}</span>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>{episode.popularity}% match</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleLike(episode.id)
                    }}
                    className={`glass-button p-3 rounded-xl transition-all ${
                      liked.has(episode.id) 
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

        {filteredEpisodes.length === 0 && (
          <div className="text-center py-12">
            <Mic className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No episodes found</h3>
            <p className="text-slate-400">Try adjusting your filters or search for something else.</p>
          </div>
        )}
      </div>
    </div>
  )
}