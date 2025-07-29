import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navigation from './components/Navigation'
import ProtectedRoute from './components/ProtectedRoute'
import Landing from './pages/Landing'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import Discovery from './pages/Discovery'
import Results from './pages/Results'
import SearchResults from './pages/SearchResults'
import EpisodeDetail from './pages/EpisodeDetail'
import PodcastDetail from './pages/PodcastDetail'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen text-white">
          <Navigation />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/discovery" element={
              <ProtectedRoute>
                <Discovery />
              </ProtectedRoute>
            } />
            <Route path="/results" element={
              <ProtectedRoute>
                <Results />
              </ProtectedRoute>
            } />
            <Route path="/search-results" element={
              <ProtectedRoute>
                <SearchResults />
              </ProtectedRoute>
            } />
            <Route path="/episode/:id" element={
              <ProtectedRoute>
                <EpisodeDetail />
              </ProtectedRoute>
            } />
            <Route path="/podcast/:id" element={
              <ProtectedRoute>
                <PodcastDetail />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App