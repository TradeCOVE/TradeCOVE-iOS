import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Feed from './pages/Feed'
import Discover from './pages/Discover'
import Messages from './pages/Messages'
import Profile from './pages/Profile'

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="nav-brand">TradeCove</div>
          <div className="nav-links">
            <Link to="/">Feed</Link>
            <Link to="/discover">Discover</Link>
            <Link to="/messages">Messages</Link>
            <Link to="/profile">Profile</Link>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
