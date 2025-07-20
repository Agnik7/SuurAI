import { Info, Globe, Calendar } from 'lucide-react'

interface ContextCardProps {
  title: string
  origin: string
  year: string
  description: string
  culturalContext: string
}

export default function ContextCard({ title, origin, year, description, culturalContext }: ContextCardProps) {
  return (
    <div className="group relative">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
      <div className="relative bg-slate-800/30 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-8 hover:bg-slate-800/50 transition-all duration-500 shadow-xl transform hover:-translate-y-1">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <Info className="h-6 w-6 text-white" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl blur-lg opacity-50"></div>
            </div>
          </div>
        
          <div className="flex-1 min-w-0">
            <h4 className="text-xl font-bold text-white mb-4 drop-shadow-lg">{title}</h4>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <Globe className="h-4 w-4 text-purple-400" />
                </div>
                <span className="text-slate-300 font-medium">Origin: {origin}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Calendar className="h-4 w-4 text-blue-400" />
                </div>
                <span className="text-slate-300 font-medium">Era: {year}</span>
              </div>
            </div>
            
            <p className="text-slate-300 mb-6 leading-relaxed">
              {description}
            </p>
            
            <div className="bg-slate-900/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-4">
              <p className="text-sm text-purple-300 font-semibold mb-2">Cultural Context</p>
              <p className="text-sm text-slate-400 leading-relaxed">
                {culturalContext}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}