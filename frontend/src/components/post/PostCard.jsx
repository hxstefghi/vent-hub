import { useState } from 'react'

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
      className="break-inside-avoid rounded-xl p-5 transition-all hover:-translate-y-0.5 cursor-pointer"
      style={{
        ...getColorStyle(post.color || 'yellow'),
        border: `1px solid ${getColorStyle(post.color || 'yellow').borderColor}`,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
      }}
    >
      {/* Header */}
      <div className="flex items-start gap-2 mb-3">
        <div
          className="w-7 h-7 shrink-0 rounded-full flex items-center justify-center font-medium text-xs"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.08)', color: '#374151' }}
        >
          {post.displayName.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0 pt-0.5">
          <div className="flex items-baseline gap-2">
            <p className="font-medium text-xs truncate" style={{ color: '#374151' }}>{post.displayName}</p>
            <span className="text-xs shrink-0" style={{ color: '#9CA3AF' }}>•</span>
            <p className="text-xs shrink-0" style={{ color: '#9CA3AF' }}>{formatDate(post.createdAt)}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <p className="mb-3 whitespace-pre-wrap text-sm leading-relaxed" style={{ color: '#374151' }}>
        {post.content}
      </p>

      {/* Footer */}
      <div className="flex items-center pt-2.5" style={{ borderTop: '1px solid rgba(0, 0, 0, 0.06)' }}>
        <button
          onClick={handleLike}
          disabled={isLiking || hasLiked}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all text-xs font-medium"
          style={
            hasLiked
              ? { backgroundColor: 'rgba(0, 0, 0, 0.08)', color: '#F472B6' }
              : { backgroundColor: 'transparent', color: '#9CA3AF' }
          }
        >
          <svg
            className="w-4 h-4"
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
