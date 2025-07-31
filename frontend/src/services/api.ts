import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

export interface Episode {
  id: string
  name: string
  description: string
  duration_ms: number
  release_date: string
  audio_preview_url?: string
  external_urls?: {
    spotify: string
  }
  images?: Array<{
    url: string
    height: number
    width: number
  }>
}

export interface Podcast {
  id: string
  name: string
  description: string
  publisher: string
  images?: Array<{
    url: string
    height: number
    width: number
  }>
  external_urls?: {
    spotify: string
  }
}

export interface PodcastWithEpisodes extends Podcast {
  podcast_episodes: Episode[]
}

export interface PodcastRecommendation {
  name?: string
  description?: string
  publisher?: string
  images?: Array<{
    url: string
    height: number
    width: number
  }>
  external_urls?: {
    spotify: string
  }
  // Handle potential variations in response structure
  [key: string]: any
}

const podcastAPI = {
  async getPodcastRecommendations(userMood: string): Promise<PodcastRecommendation[]> {
    try {
      const response = await api.get('/podcasts', {
        params: { user_mood: userMood }
      })
      console.log('API Response:', response.data)
      const data = response.data.data
      console.log('API Data:', data)
      
      // Handle QLOO API response structure: { success: true, results: { entities: [...] } }
      if (data && data.results && Array.isArray(data.results.entities)) {
        console.log('Found entities in results:', data.results.entities)
        return data.results.entities
      }
      
      // Fallback: Handle different response structures
      if (Array.isArray(data)) {
        return data
      } else if (data && typeof data === 'object') {
        // If data is an object, it might have a nested array
        const possibleArray = Object.values(data).find(Array.isArray)
        if (possibleArray) {
          return possibleArray as PodcastRecommendation[]
        }
      }
      
      console.warn('Unexpected API response structure:', data)
      return []
    } catch (error) {
      console.error('Error fetching podcast recommendations:', error)
      throw error
    }
  },

  async getPodcastEpisodes(podcastName: string): Promise<PodcastWithEpisodes> {
    try {
      const response = await api.get('/podcasts/episodes', {
        params: { podcast_name: podcastName }
      })
      return response.data.data
    } catch (error) {
      console.error('Error fetching podcast episodes:', error)
      throw error
    }
  },

  async searchPodcasts(query: string): Promise<PodcastRecommendation[]> {
    // Use the same logic as getPodcastRecommendations
    return this.getPodcastRecommendations(query)
  }
}

export const formatDuration = (durationMs: number): string => {
  const minutes = Math.floor(durationMs / 60000)
  const seconds = Math.floor((durationMs % 60000) / 1000)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

export const getImageUrl = (images?: Array<{url: string, height: number, width: number}>): string => {
  if (!images || images.length === 0) {
    return 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop'
  }
  
  const mediumImage = images.find(img => img.height >= 300 && img.height <= 600)
  if (mediumImage) return mediumImage.url
  
  return images[0].url
}

export default podcastAPI