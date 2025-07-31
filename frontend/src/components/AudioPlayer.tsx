import { useState, useRef, useEffect } from 'react'
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react'

interface AudioPlayerProps {
  episodeId: string
  title: string
  podcastName: string
  audioUrl: string
  spotifyUrl?: string
  onClose: () => void
}

export default function AudioPlayer({ title, podcastName, audioUrl, spotifyUrl, onClose }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (spotifyUrl) {
      // Update Spotify iframe src when spotifyUrl changes
      const iframe = document.getElementById('spotify-player') as HTMLIFrameElement
      if (iframe) {
        iframe.src = spotifyUrl
      }
      return
    }

    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('ended', () => setIsPlaying(false))

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('ended', () => setIsPlaying(false))
    }
  }, [spotifyUrl])

  const togglePlayPause = () => {
    if (spotifyUrl) {
      // For Spotify, we'll simulate play/pause by sending messages to iframe
      const iframe = document.getElementById('spotify-player') as HTMLIFrameElement
      if (iframe && iframe.contentWindow) {
        // Spotify Web Playback SDK commands
        if (isPlaying) {
          iframe.contentWindow.postMessage({ command: 'pause' }, '*')
        } else {
          iframe.contentWindow.postMessage({ command: 'play' }, '*')
        }
      }
      setIsPlaying(!isPlaying)
      return
    }

    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (spotifyUrl) {
      // For Spotify, we'll simulate seeking
      const newTime = parseFloat(e.target.value)
      const iframe = document.getElementById('spotify-player') as HTMLIFrameElement
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage({ command: 'seek', position: newTime }, '*')
      }
      setCurrentTime(newTime)
      return
    }

    const audio = audioRef.current
    if (!audio) return

    const newTime = parseFloat(e.target.value)
    audio.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    const newVolume = parseFloat(e.target.value)
    if (audio) {
      audio.volume = newVolume
    }
    setVolume(newVolume)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const skipTime = (seconds: number) => {
    if (spotifyUrl) {
      // For Spotify, simulate skip
      const newTime = Math.max(0, Math.min(duration, currentTime + seconds))
      const iframe = document.getElementById('spotify-player') as HTMLIFrameElement
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage({ command: 'seek', position: newTime }, '*')
      }
      setCurrentTime(newTime)
      return
    }

    const audio = audioRef.current
    if (!audio) return

    audio.currentTime = Math.max(0, Math.min(duration, audio.currentTime + seconds))
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-lg border-t border-slate-700 p-4 z-50">
      {!spotifyUrl && <audio ref={audioRef} src={audioUrl} preload="metadata" />}
      
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Episode Info */}
          <div className="flex items-center space-x-4 flex-1 min-w-0">
            <div className="min-w-0 flex-1">
              <h4 className="text-white font-medium truncate">{title}</h4>
              <p className="text-slate-400 text-sm truncate">{podcastName}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4 mx-8">
            <button
              onClick={() => skipTime(-15)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <SkipBack className="h-5 w-5" />
            </button>
            
            <button
              onClick={togglePlayPause}
              className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full transition-colors"
            >
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </button>
            
            <button
              onClick={() => skipTime(15)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <SkipForward className="h-5 w-5" />
            </button>
          </div>

          {/* Progress and Volume */}
          <div className="flex items-center space-x-4 flex-1">
            <span className="text-slate-400 text-sm min-w-0">
              {formatTime(currentTime)}
            </span>
            
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
            />
            
            <span className="text-slate-400 text-sm min-w-0">
              {formatTime(duration)}
            </span>

            <div className="flex items-center space-x-2">
              <Volume2 className="h-4 w-4 text-slate-400" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="w-20 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors ml-4"
            >
              ×
            </button>
          </div>
        </div>
      </div>
      
      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #9333ea;
          cursor: pointer;
        }
        
        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #9333ea;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  )
}