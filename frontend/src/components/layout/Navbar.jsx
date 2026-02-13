import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation()

  return (
    <nav className="border-b sticky top-0 z-50 backdrop-blur-sm bg-white/95" style={{ borderColor: '#F3F4F6' }}>
      <div className="container mx-auto py-3 sm:py-4 px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-lg sm:text-xl font-semibold" style={{ color: '#111827' }}>
              Vent<span style={{ color: '#F472B6' }}>Hub</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              to="/"
              className={`px-3 sm:px-4 py-1.5 sm:py-2 text-sm rounded-lg font-medium transition-all ${location.pathname === '/'
                ? 'text-white'
                : 'hover:bg-opacity-50'
                }`}
              style={
                location.pathname === '/'
                  ? { backgroundColor: '#F472B6', color: 'white' }
                  : { color: '#6B7280' }
              }
            >
              Home
            </Link>
            <Link
              to="/create"
              className={`px-3 sm:px-4 py-1.5 sm:py-2 text-sm rounded-lg font-medium transition-all ${location.pathname === '/create'
                ? 'text-white'
                : 'hover:bg-opacity-50'
                }`}
              style={
                location.pathname === '/create'
                  ? { backgroundColor: '#F472B6', color: 'white' }
                  : { color: '#6B7280' }
              }
            >
              New Post
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
