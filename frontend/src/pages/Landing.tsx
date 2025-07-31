import { Link } from 'react-router-dom'
import { Play, Sparkles, ArrowRight, Headphones } from 'lucide-react'

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239333ea' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }} />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-cyan-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <span className="inline-block px-6 py-3 bg-purple-500/10 backdrop-blur-sm border border-purple-500/20 rounded-full text-purple-300 text-sm font-medium mb-8">
                🎙️ AI-Powered Podcast Discovery
              </span>
            </div>
            
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
                Discover Podcasts
              </span>
              <br />
              <span className="text-white drop-shadow-2xl">Through Your Mood</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              Tell us how you're feeling or what you're doing, and let our AI find the perfect podcast content for your moment. 
              <span className="text-purple-300 font-medium"> Experience podcasts like never before.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
              <Link 
                to="/discovery"
                className="group relative bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 hover:from-purple-500 hover:via-blue-500 hover:to-purple-500 text-white font-semibold py-5 px-10 rounded-2xl transition-all duration-500 transform hover:scale-105 flex items-center space-x-3 shadow-2xl hover:shadow-purple-500/25"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <Sparkles className="h-6 w-6 relative z-10" />
                <span className="relative z-10 text-lg">Get Started</span>
                <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform relative z-10" />
              </Link>
              
              <button className="group relative border-2 border-slate-500/50 hover:border-purple-400/50 bg-slate-800/30 backdrop-blur-sm text-slate-300 hover:text-white font-semibold py-5 px-10 rounded-2xl transition-all duration-300 flex items-center space-x-3">
                <Play className="h-6 w-6 group-hover:scale-110 transition-transform" />
                <span className="text-lg">Watch Demo</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 drop-shadow-xl">
              How SuurAI Works
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto mb-6"></div>
            <p className="text-xl text-slate-300 font-light">
              Three simple steps to your perfect podcast queue
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group text-center p-10 rounded-3xl glass-card hover:border-purple-500/50 transition-all duration-500 transform hover:-translate-y-2">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 transition-transform">
                  <Headphones className="h-10 w-10 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity mx-auto w-20 h-20"></div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-6">
                Describe Your Mood
              </h3>
              <p className="text-slate-400 leading-relaxed text-lg">
                Type naturally: "I need productivity podcasts for focused work" or "motivational business content"
              </p>
            </div>
            
            <div className="group text-center p-10 rounded-3xl glass-card hover:border-blue-500/50 transition-all duration-500 transform hover:-translate-y-2">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 transition-transform">
                  <Sparkles className="h-10 w-10 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity mx-auto w-20 h-20"></div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-6">
                AI Understanding
              </h3>
              <p className="text-slate-400 leading-relaxed text-lg">
                Our AI refines your intent into structured queries to find exactly what you need
              </p>
            </div>
            
            <div className="group text-center p-10 rounded-3xl glass-card hover:border-cyan-500/50 transition-all duration-500 transform hover:-translate-y-2">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 transition-transform">
                  <Play className="h-10 w-10 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity mx-auto w-20 h-20"></div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-6">
                Curated Results
              </h3>
              <p className="text-slate-400 leading-relaxed text-lg">
                Get personalized recommendations with cultural context and the ability to fine-tune
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
        <div className="relative max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-3xl p-12 shadow-2xl">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8 drop-shadow-xl">
              Ready to Find Your Voice?
            </h2>
            <p className="text-xl text-slate-300 mb-10 font-light leading-relaxed">
              Join thousands of podcast lovers discovering their perfect content. 
              <br className="hidden sm:block" />
              <span className="text-purple-300 font-medium">Your next favorite episode is just a mood away.</span>
            </p>
            <Link 
              to="/discovery"
              className="group relative inline-flex items-center space-x-3 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 hover:from-purple-500 hover:via-blue-500 hover:to-purple-500 text-white font-semibold py-5 px-10 rounded-2xl transition-all duration-500 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <Sparkles className="h-6 w-6 relative z-10" />
              <span className="relative z-10 text-lg">Start Your Journey</span>
              <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform relative z-10" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}