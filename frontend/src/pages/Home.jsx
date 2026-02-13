import { Link } from 'react-router-dom'
import { Lock, MessageCircle, Users } from 'lucide-react'
import PostList from '../components/post/PostList'
import Button from '../components/ui/Button'

function Home() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-8 sm:py-12 px-4">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16 max-w-2xl mx-auto">
          <h1 className="mb-4 sm:mb-6 text-2xl sm:text-3xl lg:text-4xl" style={{ color: '#111827' }}>
            A Safe Space for Your <span style={{ color: '#F472B6' }}>Thoughts</span>
          </h1>
          <p className="text-base sm:text-lg mb-6 sm:mb-8 px-4" style={{ color: '#6B7280', lineHeight: '1.8' }}>
            Share what's on your mind without anyone knowing who you are. No sign ups, no emails, no tracking. Just real people who get it.
          </p>
          <Link to="/create">
            <Button variant="primary" className="text-sm sm:text-base">
              Post Something
            </Button>
          </Link>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-16 sm:mb-20 max-w-4xl mx-auto">
          <div className="text-center p-6 sm:p-8 rounded-xl transition-all">
            <div className="flex justify-center mb-3 sm:mb-4">
              <Lock size={32} className="sm:w-9 sm:h-9" style={{ color: '#F472B6' }} strokeWidth={1.5} />
            </div>
            {/* <h3 className="text-sm sm:text-base font-semibold mb-2 sm:mb-3" style={{ color: '#111827' }}>
              Completely Anonymous
            </h3> */}
            <p style={{ color: '#6B7280', fontSize: '0.8125rem', lineHeight: '1.7' }} className="sm:text-sm">
              No login needed. No one knows who you are. Your secrets stay yours.
            </p>
          </div>
          <div className="text-center p-6 sm:p-8 rounded-xl transition-all">
            <div className="flex justify-center mb-3 sm:mb-4">
              <MessageCircle size={32} className="sm:w-9 sm:h-9" style={{ color: '#F472B6' }} strokeWidth={1.5} />
            </div>
            {/* <h3 className="text-sm sm:text-base font-semibold mb-2 sm:mb-3" style={{ color: '#111827' }}>
              Safe Space
            </h3> */}
            <p style={{ color: '#6B7280', fontSize: '0.8125rem', lineHeight: '1.7' }} className="sm:text-sm">
              Say what you really feel. No one here will judge you.
            </p>
          </div>
          <div className="text-center p-6 sm:p-8 rounded-xl transition-all">
            <div className="flex justify-center mb-3 sm:mb-4">
              <Users size={32} className="sm:w-9 sm:h-9" style={{ color: '#F472B6' }} strokeWidth={1.5} />
            </div>
            {/* <h3 className="text-sm sm:text-base font-semibold mb-2 sm:mb-3" style={{ color: '#111827' }}>
              Community Support
            </h3> */}
            <p style={{ color: '#6B7280', fontSize: '0.8125rem', lineHeight: '1.7' }} className="sm:text-sm">
              Connect through shared experiences and mutual understanding.
            </p>
          </div>
        </div>

        {/* Posts Section */}
        <div className="max-w-6xl mx-auto pb-12 sm:pb-16">
          <h2 className="mb-6 sm:mb-8 text-center text-xl sm:text-2xl" style={{ color: '#111827' }}>
            Recent Posts
          </h2>
          <PostList />
        </div>
      </div>
    </div>
  )
}

export default Home
