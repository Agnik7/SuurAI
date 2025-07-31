import { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { Play, Heart, Plus, Share, ArrowLeft, Clock, User, Calendar } from 'lucide-react'
import podcastAPI, { PodcastWithEpisodes, formatDuration, getImageUrl } from '../services/api'
import AudioPlayer from '../components/AudioPlayer'

interface Episode {
  id: string
  name: string
  description: string
  duration_ms: number
  release_date: string
  audio_preview_url?: string
  external_urls?: {spotify?: string}
  images?: Array<{url: string, height: number, width: number}>
}

interface Podcast {
  id: string
  name: string
  image: string
  description: string
  publisher: string
  category?: string
  episodes: Episode[]
}

export default function PodcastDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const {podcastName, podcastImage} = location.state
  const [podcast, setPodcast] = useState<Podcast | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [likedEpisodes, setLikedEpisodes] = useState<Set<string>>(new Set())
  const [currentlyPlaying, setCurrentlyPlaying] = useState<{episodeId: string, title: string, podcastName: string, audioUrl: string, spotifyUrl?: string} | null>(null)

  const transformPodcastData = (data: PodcastWithEpisodes): Podcast => {
    return {
      id: id || 'unknown',
      name: data.name,
      image: podcastImage || getImageUrl(data.images),
      description: data.description,
      publisher: data.publisher,
      category: 'Technology', // Default category
      episodes: data.podcast_episodes.map(episode => ({
        id: episode.id,
        name: episode.name,
        description: episode.description,
        duration_ms: episode.duration_ms,
        release_date: episode.release_date,
        audio_preview_url: episode.audio_preview_url,
        external_urls: episode.external_urls,
        images: episode.images
      }))
    }
  }

  useEffect(() => {
    const fetchPodcastDetails = async () => {
      if (!podcastName) {
        setError('Podcast name not provided')
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        setError(null)
        const podcastData = await podcastAPI.getPodcastEpisodes(podcastName)
        const transformedPodcast = transformPodcastData(podcastData)
        setPodcast(transformedPodcast)
      } catch (err) {
        console.error('Failed to fetch podcast details:', err)
        setError('Failed to load podcast details. Please try again.')
        setPodcast(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPodcastDetails()
  }, [id, podcastName])

  const toggleLike = (episodeId: string) => {
    setLikedEpisodes(prev => {
      const newLiked = new Set(prev)
      if (newLiked.has(episodeId)) {
        newLiked.delete(episodeId)
      } else {
        newLiked.add(episodeId)
      }
      return newLiked
    })
  }

  const convertToSpotifyEmbed = (spotifyUrl: string): string => {
    // Convert https://open.spotify.com/episode/abcd1234 to https://open.spotify.com/embed/episode/abcd1234
    if (spotifyUrl.includes('open.spotify.com/episode/')) {
      return spotifyUrl.replace('open.spotify.com/episode/', 'open.spotify.com/embed/episode/')
    }
    return spotifyUrl
  }

  const playEpisode = (episode: Episode) => {
    const spotifyUrl = episode.external_urls?.spotify
    const embedUrl = spotifyUrl ? convertToSpotifyEmbed(spotifyUrl) : ''
    
    if (embedUrl) {
      setSpotifyEmbedUrl(embedUrl)
    }
    
    setCurrentlyPlaying({
      episodeId: episode.id,
      title: episode.name,
      podcastName: podcast?.name || 'Unknown Podcast',
      audioUrl: episode.audio_preview_url || 'https://example.com/placeholder-audio.mp3',
      spotifyUrl: embedUrl
    })
  }

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
            <h2 className="text-2xl font-bold text-white mb-2">Loading podcast...</h2>
          </div>
        </div>
      </div>
    )
  }

  if (error || !podcast) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden pt-24">
        <div className="relative flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-red-400 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-white mb-2">
              {error || 'Podcast not found'}
            </h2>
            <div className="space-y-2">
              <button 
                onClick={() => navigate(-1)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl transition-colors mr-4"
              >
                Go Back
              </button>
              <button 
                onClick={() => window.location.reload()}
                className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-3 rounded-xl transition-colors"
              >
                Try Again
              </button>
            </div>
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
          <button 
            onClick={() => navigate(-1)}
            className="glass-button p-3 rounded-xl text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white">Podcast Details</h1>
          </div>
        </div>

        {/* Podcast Header */}
        <div className="glass-card rounded-2xl p-8 mb-8">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-shrink-0">
              <img 
                src={podcastImage || podcast.image} 
                alt={podcast.name}
                className="w-64 h-64 rounded-2xl object-cover shadow-2xl"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <h2 className="text-4xl font-bold text-white mb-4">{podcast.name}</h2>
              
              <div className="flex items-center space-x-6 mb-6 text-slate-300">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>{podcast.publisher}</span>
                </div>
                {podcast.category && (
                  <div className="inline-block bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full text-sm font-medium">
                    {podcast.category}
                  </div>
                )}
              </div>
              
              <p className="text-slate-300 text-lg leading-relaxed mb-8">
                {podcast.description}
              </p>
              
              <div className="flex items-center space-x-4">
                <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-medium transition-all flex items-center space-x-2">
                  <Plus className="h-5 w-5" />
                  <span>Subscribe</span>
                </button>
                
                <button className="glass-button p-3 rounded-xl text-slate-400 hover:text-white transition-all">
                  <Heart className="h-5 w-5" />
                </button>
                
                <button className="glass-button p-3 rounded-xl text-slate-400 hover:text-white transition-all">
                  <Share className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Episodes List */}
        <div className="glass-card rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6">
            Episodes ({podcast.episodes.length})
          </h3>
          
          <div className="space-y-6">
            {podcast.episodes.map((episode) => {
              const spotifyUrl = episode.external_urls?.spotify
              const embedUrl = spotifyUrl ? convertToSpotifyEmbed(spotifyUrl) : null
              
              return (
                <div
                  key={episode.id}
                  className="group glass-card rounded-xl p-6 hover:bg-slate-800/50 transition-all duration-300"
                >
                  <div className="flex gap-4 mb-4">
                    {/* Episode/Podcast Image */}
                    <div className="flex-shrink-0">
                      <img 
                        src={podcastImage || episode.images?.[0]?.url || podcast?.image} 
                        alt={episode.name}
                        className="w-16 h-16 rounded-lg object-cover shadow-lg"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                        {episode.name}
                      </h4>
                      <p className="text-slate-400 mb-4 line-clamp-2">
                        {episode.description}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-slate-400 mb-4">
                        <span className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{formatDuration(episode.duration_ms)}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(episode.release_date).toLocaleDateString()}</span>
                        </span>
                        <div className="flex items-center space-x-2 ml-auto">
                          <button
                            onClick={() => toggleLike(episode.id)}
                            className={`glass-button p-2 rounded-lg transition-all ${
                              likedEpisodes.has(episode.id) 
                                ? 'text-red-400 bg-red-500/10' 
                                : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            <Heart className="h-4 w-4" />
                          </button>
                          
                          <button className="glass-button p-2 rounded-lg text-slate-400 hover:text-white transition-all">
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Spotify Embed */}
                  {embedUrl ? (
                    <div className="w-full">
                      <iframe
                        src={embedUrl}
                        width="100%"
                        height="232"
                        style={{
                          borderRadius: '12px',
                          border: 'none'
                        }}
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        title={`Spotify player for ${episode.name}`}
                      ></iframe>
                    </div>
                  ) : (
                    <div className="w-full h-32 bg-slate-800/50 rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-slate-400 text-2xl mb-2">🎵</div>
                        <p className="text-slate-400 text-sm">No Spotify embed available</p>
                        {episode.audio_preview_url && (
                          <button
                            onClick={() => playEpisode(episode)}
                            className="mt-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center space-x-2 mx-auto"
                          >
                            <Play className="h-4 w-4" />
                            <span>Play Preview</span>
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {podcast.episodes.length === 0 && (
            <div className="text-center py-12">
              <div className="text-slate-400 text-6xl mb-4">🎙️</div>
              <h4 className="text-xl font-semibold text-white mb-2">No episodes available</h4>
              <p className="text-slate-400">This podcast doesn't have any episodes yet.</p>
            </div>
          )}
        </div>
      </div>


      {/* Audio Player */}
      {currentlyPlaying && (
        <AudioPlayer
          episodeId={currentlyPlaying.episodeId}
          title={currentlyPlaying.title}
          podcastName={currentlyPlaying.podcastName}
          audioUrl={currentlyPlaying.audioUrl}
          spotifyUrl={currentlyPlaying.spotifyUrl}
          onClose={() => setCurrentlyPlaying(null)}
        />
      )}
    </div>
  )
}