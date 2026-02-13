import { useState, useEffect } from 'react'
import { MessageCircle } from 'lucide-react'
import api from '../../api/axios'
import PostCard from './PostCard'
import Button from '../ui/Button'

function PostList() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filters, setFilters] = useState({
    mood: '',
    sortBy: 'latest',
    page: 1
  })
  const [pagination, setPagination] = useState(null)

  useEffect(() => {
    fetchPosts()
  }, [filters])

  const fetchPosts = async () => {
    setLoading(true)
    setError('')

    try {
      const params = {
        page: filters.page,
        limit: 10,
        sortBy: filters.sortBy,
        ...(filters.mood && { mood: filters.mood })
      }

      const response = await api.get('/posts', { params })
      setPosts(response.data.data.posts)
      setPagination(response.data.data.pagination)
    } catch (err) {
      setError('Failed to load posts. Please try again.')
      console.error('Error fetching posts:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleLike = async (postId) => {
    try {
      await api.patch(`/posts/${postId}/like`)
    } catch (err) {
      console.error('Failed to like post:', err)
      throw err
    }
  }

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value,
      page: 1 // Reset to first page when changing filters
    }))
  }

  const handlePageChange = (newPage) => {
    setFilters(prev => ({
      ...prev,
      page: newPage
    }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading && posts.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="font-medium" style={{ color: '#6B7280' }}>Loading thoughts...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Filters */}
      <div className="card mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Mood Filter */}
          <div className="flex-1">
            <label htmlFor="mood-filter" className="block text-sm font-medium mb-2" style={{ color: '#111827' }}>
              Filter by Mood
            </label>
            <select
              id="mood-filter"
              value={filters.mood}
              onChange={(e) => handleFilterChange('mood', e.target.value)}
              className="select-field"
            >
              <option value="">All Moods</option>
              <option value="happy">Happy</option>
              <option value="sad">Sad</option>
              <option value="angry">Angry</option>
              <option value="anxious">Anxious</option>
            </select>
          </div>

          {/* Sort Filter */}
          <div className="flex-1">
            <label htmlFor="sort-filter" className="block text-sm font-medium mb-2" style={{ color: '#111827' }}>
              Sort By
            </label>
            <select
              id="sort-filter"
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="select-field"
            >
              <option value="latest">Latest First</option>
              <option value="oldest">Oldest First</option>
              <option value="mostLiked">Most Liked</option>
            </select>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="alert alert-error mb-6">
          <p className="font-semibold">{error}</p>
          <button
            onClick={fetchPosts}
            className="text-sm underline hover:no-underline mt-2 font-medium"
          >
            Try again
          </button>
        </div>
      )}

      {/* Posts Grid */}
      {posts.length === 0 ? (
        <div className="card p-12 text-center">
          <div className="flex justify-center mb-4">
            <MessageCircle size={48} style={{ color: '#F472B6' }} strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-semibold mb-2" style={{ color: '#111827' }}>
            No thoughts shared yet
          </h3>
          <p style={{ color: '#6B7280' }}>
            Be the first one to share your thoughts!
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-0">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} onLike={handleLike} />
            ))}
          </div>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                variant="outline"
                onClick={() => handlePageChange(filters.page - 1)}
                disabled={!pagination.hasPreviousPage || loading}
              >
                Previous
              </Button>
              <span className="font-medium px-3" style={{ color: '#111827' }}>
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() => handlePageChange(filters.page + 1)}
                disabled={!pagination.hasNextPage || loading}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default PostList
