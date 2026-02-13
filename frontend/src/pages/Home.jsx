import { Link } from 'react-router-dom'
import { Lock, MessageCircle, Users } from 'lucide-react'
import PostList from '../components/post/PostList'
import Button from '../components/ui/Button'

function Home() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h1 className="mb-6" style={{ color: '#111827' }}>
            A Safe Space for Your <span style={{ color: '#F472B6' }}>Thoughts</span>
          </h1>
          <p className="text-lg mb-8" style={{ color: '#6B7280', lineHeight: '1.8' }}>
            Share your feelings anonymously in a judgment-free environment. No signup required, no tracking—just genuine support and understanding.
          </p>
          <Link to="/create">
            <Button variant="primary" className="text-base">
              Share Your Thoughts
            </Button>
          </Link>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 max-w-4xl mx-auto">
          <div className="text-center p-8 rounded-xl transition-all">
            <div className="flex justify-center mb-4">
              <Lock size={36} style={{ color: '#F472B6' }} strokeWidth={1.5} />
            </div>
            <h3 className="text-base font-semibold mb-3" style={{ color: '#111827' }}>
              Completely Anonymous
            </h3>
            <p style={{ color: '#6B7280', fontSize: '0.875rem', lineHeight: '1.7' }}>
              No login required. No tracking. Your privacy is our priority.
            </p>
          </div>
          <div className="text-center p-8 rounded-xl transition-all">
            <div className="flex justify-center mb-4">
              <MessageCircle size={36} style={{ color: '#F472B6' }} strokeWidth={1.5} />
            </div>
            <h3 className="text-base font-semibold mb-3" style={{ color: '#111827' }}>
              Safe Space
            </h3>
            <p style={{ color: '#6B7280', fontSize: '0.875rem', lineHeight: '1.7' }}>
              Express yourself freely without fear of judgment.
            </p>
          </div>
          <div className="text-center p-8 rounded-xl transition-all">
            <div className="flex justify-center mb-4">
              <Users size={36} style={{ color: '#F472B6' }} strokeWidth={1.5} />
            </div>
            <h3 className="text-base font-semibold mb-3" style={{ color: '#111827' }}>
              Community Support
            </h3>
            <p style={{ color: '#6B7280', fontSize: '0.875rem', lineHeight: '1.7' }}>
              Connect through shared experiences and mutual understanding.
            </p>
          </div>
        </div>

        {/* Posts Section */}
        <div className="max-w-2xl mx-auto pb-16">
          <h2 className="mb-8" style={{ color: '#111827' }}>
            Recent Thoughts
          </h2>
          <PostList />
        </div>
      </div>
    </div>
  )
}

export default Home
