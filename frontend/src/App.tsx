import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
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
    <Router>
      <div className="min-h-screen text-white">
        <Navigation />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/discovery" element={<Discovery />} />
          <Route path="/results" element={<Results />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/episode/:id" element={<EpisodeDetail />} />
          <Route path="/podcast/:id" element={<PodcastDetail />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App