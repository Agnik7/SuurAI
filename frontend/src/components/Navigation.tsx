import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Mic, Menu, X, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Navigation() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsUserMenuOpen(false)
  }

  const navLinks = isAuthenticated ? [
    { to: '/', label: 'Home' },
    { to: '/discovery', label: 'Discover' }
  ] : [
    { to: '/', label: 'Home' },
    { to: '/login', label: 'Sign In' }
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 navbar-base ${
      isScrolled 
        ? 'glass-nav navbar-scrolled' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Mic className="h-10 w-10 text-purple-400 group-hover:text-purple-300 transition-colors" />
              <div className="absolute inset-0 bg-purple-400/20 rounded-lg blur-lg group-hover:bg-purple-300/30 transition-all"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              SuurAI
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link 
                key={link.to}
                to={link.to} 
                className={`relative px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 group ${
                  location.pathname === link.to 
                    ? 'bg-purple-600/20 text-purple-300 backdrop-blur-sm border border-purple-500/30' 
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="relative z-10">{link.label}</span>
                {location.pathname === link.to && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl blur-sm"></div>
                )}
              </Link>
            ))}
            
            {isAuthenticated && (
              <div className="relative ml-4">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 glass-button px-4 py-3 rounded-xl text-slate-300 hover:text-white transition-all"
                >
                  <img 
                    src={user?.avatar} 
                    alt={user?.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{user?.name}</span>
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 glass-card rounded-xl p-2 shadow-xl">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2 px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/30 transition-all"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden glass-button p-3 rounded-xl text-slate-300 hover:text-white transition-all"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 space-y-2 glass-card rounded-2xl mb-4">
            {navLinks.map((link) => (
              <Link 
                key={link.to}
                to={link.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-6 py-4 mx-4 rounded-xl text-base font-medium transition-all ${
                  location.pathname === link.to 
                    ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30' 
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}