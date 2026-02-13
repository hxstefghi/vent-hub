import { useState } from 'react'
import { Smile, Frown, Angry, Zap, MessageCircle } from 'lucide-react'

function PostCard({ post, onLike }) {
  const [isLiking, setIsLiking] = useState(false)
  const [likes, setLikes] = useState(post.likes)
  const [hasLiked, setHasLiked] = useState(false)

  const getColorStyle = (color) => {
    const styles = {
      yellow: { backgroundColor: '#FEF3C7', borderColor: '#FEF08A' },
      pink: { backgroundColor: '#FCE7F3', borderColor: '#FBCFE8' },
      blue: { backgroundColor: '#DBEAFE', borderColor: '#BFDBFE' },
      green: { backgroundColor: '#D1FAE5', borderColor: '#A7F3D0' },
      purple: { backgroundColor: '#EDE9FE', borderColor: '#DDD6FE' },
      orange: { backgroundColor: '#FFEDD5', borderColor: '#FED7AA' },
    }
    return styles[color] || styles.yellow
  }

  const handleLike = async () => {
    if (isLiking || hasLiked) return

    setIsLiking(true)
    try {
      await onLike(post._id)
      setLikes(prev => prev + 1)
      setHasLiked(true)
    } catch (error) {
      console.error('Failed to like post:', error)
    } finally {
      setIsLiking(false)
    }
  }

  const getMoodStyle = (mood) => {
    const styles = {
      happy: { backgroundColor: 'rgba(254, 243, 199, 0.8)', color: '#92400E' },
      sad: { backgroundColor: 'rgba(219, 234, 254, 0.8)', color: '#1E3A8A' },
      angry: { backgroundColor: 'rgba(254, 226, 226, 0.8)', color: '#991B1B' },
      anxious: { backgroundColor: 'rgba(237, 233, 254, 0.8)', color: '#5B21B6' },
    }
    return styles[mood] || { backgroundColor: 'rgba(243, 244, 246, 0.8)', color: '#374151' }
  }

  const getMoodIcon = (mood) => {
    const icons = {
      happy: <Smile size={14} />,
      sad: <Frown size={14} />,
      angry: <Angry size={14} />,
      anxious: <Zap size={14} />,
    }
    return icons[mood] || <MessageCircle size={14} />
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now - date) / 1000)

    if (diffInSeconds < 60) return 'Just now'
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <div
      className="mb-4 rounded-xl p-6 transition-all hover:-translate-y-0.5"
      style={{
        ...getColorStyle(post.color || 'yellow'),
        border: `1px solid ${getColorStyle(post.color || 'yellow').borderColor}`,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center font-medium text-xs"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.08)', color: '#374151' }}
          >
            {post.displayName.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-medium text-sm" style={{ color: '#374151' }}>{post.displayName}</p>
            <p className="text-xs mt-0.5" style={{ color: '#6B7280' }}>{formatDate(post.createdAt)}</p>
          </div>
        </div>
        <span
          className="mood-badge"
          style={{
            ...getMoodStyle(post.mood),
            fontSize: '0.75rem',
            padding: '4px 10px'
          }}
        >
          {getMoodIcon(post.mood)} {post.mood}
        </span>
      </div>

      {/* Content */}
      <p className="mb-4 whitespace-pre-wrap text-sm leading-relaxed" style={{ color: '#374151' }}>
        {post.content}
      </p>

      {/* Footer */}
      <div className="flex items-center pt-3" style={{ borderTop: '1px solid rgba(0, 0, 0, 0.06)' }}>
        <button
          onClick={handleLike}
          disabled={isLiking || hasLiked}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all text-xs font-medium"
          style={
            hasLiked
              ? { backgroundColor: 'rgba(0, 0, 0, 0.08)', color: '#F472B6' }
              : { backgroundColor: 'transparent', color: '#6B7280' }
          }
        >
          <svg
            className="w-5 h-5"
            fill={hasLiked ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <span>{likes}</span>
        </button>
      </div>
    </div>
  )
}

export default PostCard
