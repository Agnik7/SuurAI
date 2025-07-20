import { useState } from 'react'
import { Volume2, Zap, Coffee, Sun } from 'lucide-react'

interface MoodSliderProps {
  onEnergyChange: (energy: number) => void
  onGenreChange: (genre: string) => void
}

export default function MoodSlider({ onEnergyChange, onGenreChange }: MoodSliderProps) {
  const [energy, setEnergy] = useState(50)
  const [selectedGenre, setSelectedGenre] = useState('')

  const handleEnergyChange = (value: number) => {
    setEnergy(value)
    onEnergyChange(value)
  }

  const genres = [
    'Electronic', 'Indie', 'Jazz', 'Hip-Hop', 'Rock', 'Classical', 
    'Pop', 'R&B', 'Alternative', 'Ambient'
  ]

  const getEnergyIcon = () => {
    if (energy < 25) return <Coffee className="h-5 w-5" />
    if (energy < 50) return <Volume2 className="h-5 w-5" />
    if (energy < 75) return <Sun className="h-5 w-5" />
    return <Zap className="h-5 w-5" />
  }

  const getEnergyLabel = () => {
    if (energy < 25) return 'Chill'
    if (energy < 50) return 'Relaxed'
    if (energy < 75) return 'Upbeat'
    return 'Energetic'
  }

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-3xl blur-xl opacity-50"></div>
      <div className="relative bg-slate-800/30 backdrop-blur-lg border border-slate-700/50 rounded-3xl p-8 shadow-2xl">
        <h3 className="text-xl font-bold text-white mb-8 drop-shadow-lg">Fine-tune Your Mood</h3>
      
      {/* Energy Slider */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-medium text-slate-300">Energy Level</label>
          <div className="flex items-center space-x-2 text-purple-400">
            {getEnergyIcon()}
            <span className="text-sm font-medium">{getEnergyLabel()}</span>
          </div>
        </div>
        
        <div className="relative">
          <input
            type="range"
            min="0"
            max="100"
            value={energy}
            onChange={(e) => handleEnergyChange(Number(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${energy}%, #475569 ${energy}%, #475569 100%)`
            }}
          />
          <div 
            className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-purple-500 border-2 border-white rounded-full pointer-events-none"
            style={{ left: `calc(${energy}% - 8px)` }}
          />
        </div>
      </div>

      {/* Genre Filter */}
      <div>
        <label className="text-sm font-medium text-slate-300 mb-3 block">
          Genre Focus (Optional)
        </label>
        <div className="flex flex-wrap gap-3">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => {
                const newGenre = selectedGenre === genre ? '' : genre
                setSelectedGenre(newGenre)
                onGenreChange(newGenre)
              }}
              className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-lg ${
                selectedGenre === genre
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-purple-500/25'
                  : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 hover:text-white border border-slate-600/50'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>
    </div>
    </div>
  )
}