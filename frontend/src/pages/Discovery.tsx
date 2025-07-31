import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Send, Sparkles } from 'lucide-react'

export default function Discovery() {
  const [query, setQuery] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    
    setIsProcessing(true)
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsProcessing(false)
    
    // Navigate to search results with query
    navigate('/search-results', { state: { query } })
  }


  const quickPrompts = [
    "Motivational business podcasts",
    "Educational science deep-dives",
    "Comedy podcasts for laughs",
    "True crime mysteries",
    "Productivity and focus tips",
    "Inspiring morning talks"
  ]

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
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mb-6">
            <span className="inline-block px-6 py-3 bg-purple-500/10 backdrop-blur-sm border border-purple-500/20 rounded-full text-purple-300 text-sm font-medium mb-8">
              🎯 Mood Discovery
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold mb-8 drop-shadow-xl">
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              What's Your Mood?
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
            Describe how you're feeling, what you're doing, or the vibe you want. 
            <span className="text-purple-300 font-medium"> Our AI will find the perfect podcasts to match.</span>
          </p>
        </div>

        {/* Main Input Form */}
        <form onSubmit={handleSubmit} className="mb-16">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <div className="relative flex items-center bg-slate-800/50 backdrop-blur-sm rounded-3xl border border-slate-700/50 focus-within:border-purple-500/50 focus-within:bg-slate-800/70 transition-all shadow-2xl">
              <Search className="h-6 w-6 text-slate-400 ml-8" />
              
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type your mood... e.g., 'I need productivity podcasts for focused work'"
                className="flex-1 bg-transparent text-white placeholder-slate-400 px-6 py-8 text-lg focus:outline-none"
                disabled={isProcessing}
              />
              
              
              <button
                type="submit"
                disabled={!query.trim() || isProcessing}
                className="mr-4 relative bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 hover:from-purple-500 hover:via-blue-500 hover:to-purple-500 disabled:from-slate-600 disabled:to-slate-600 disabled:cursor-not-allowed text-white p-4 rounded-2xl transition-all duration-500 shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur-lg opacity-50"></div>
                {isProcessing ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent relative z-10"></div>
                ) : (
                  <Send className="h-6 w-6 relative z-10" />
                )}
              </button>
            </div>
            
          </div>
        </form>

        {/* Quick Prompts */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center drop-shadow-lg">
            Or try these popular moods:
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {quickPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => setQuery(prompt)}
                className="group relative bg-slate-800/30 backdrop-blur-sm hover:bg-slate-800/50 border border-slate-700/50 hover:border-purple-500/50 text-slate-300 hover:text-white p-6 rounded-2xl transition-all duration-500 text-left transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                disabled={isProcessing}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-blue-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors">
                    <Sparkles className="h-5 w-5 text-purple-400 group-hover:text-purple-300 transition-colors" />
                  </div>
                  <span className="font-medium">{prompt}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Processing State */}
        {isProcessing && (
          <div className="text-center py-12">
            <div className="inline-flex items-center space-x-3 bg-slate-800 px-6 py-4 rounded-xl">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-purple-400 border-t-transparent"></div>
              <span className="text-purple-400 font-medium">
                AI is analyzing your mood and finding perfect matches...
              </span>
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-3xl blur-xl opacity-50"></div>
          <div className="relative bg-slate-800/30 backdrop-blur-lg border border-slate-700/50 rounded-3xl p-10 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
              <span className="text-2xl">💡</span>
              <span>Tips for better results:</span>
            </h3>
            <ul className="space-y-4 text-slate-300">
              <li className="flex items-start space-x-3">
                <span className="w-2 h-2 bg-purple-400 rounded-full mt-3 flex-shrink-0"></span>
                <span className="text-lg leading-relaxed">Be specific about your activity: "working", "learning", "commuting"</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="w-2 h-2 bg-blue-400 rounded-full mt-3 flex-shrink-0"></span>
                <span className="text-lg leading-relaxed">Include engagement level: "deep-dive", "casual listening", "background audio"</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="w-2 h-2 bg-cyan-400 rounded-full mt-3 flex-shrink-0"></span>
                <span className="text-lg leading-relaxed">Mention topics you like: "business", "technology", "comedy", "true crime"</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="w-2 h-2 bg-purple-400 rounded-full mt-3 flex-shrink-0"></span>
                <span className="text-lg leading-relaxed">Describe the duration: "short episodes", "long interviews", "bite-sized content"</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}