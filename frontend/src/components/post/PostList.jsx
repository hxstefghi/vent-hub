import { useState, useEffect, useCallback } from 'react'
import { MessageCircle } from 'lucide-react'
import api from '../../api/axios'
import PostCard from './PostCard'
import Button from '../ui/Button'

function PostList() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filters, setFilters] = useState({
    sortBy: 'latest',
    page: 1
  })
  const [pagination, setPagination] = useState(null)

  const fetchPosts = useCallback(async () => {
    setLoading(true)
    setError('')

    try {
      const params = {
        page: filters.page,
        limit: 10,
        sortBy: filters.sortBy
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
  }, [filters])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

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
          <p className="font-medium" style={{ color: '#6B7280' }}>Loading posts...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 p-3 sm:p-4 rounded-lg" style={{ backgroundColor: 'rgba(244, 114, 182, 0.04)' }}>
        <p className="text-xs sm:text-sm font-medium" style={{ color: '#6B7280' }}>
          {pagination?.totalPosts || 0} {pagination?.totalPosts === 1 ? 'post' : 'posts'}
        </p>
        <div className="flex items-center gap-2">
          <label htmlFor="sort-filter" className="text-xs sm:text-sm font-medium" style={{ color: '#6B7280' }}>
            Sort:
          </label>
          <select
            id="sort-filter"
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className="text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-gray-200 bg-white"
            style={{ color: '#374151' }}
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="mostLiked">Most Liked</option>
          </select>
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
        <div className="p-8 sm:p-12 text-center rounded-xl" style={{ backgroundColor: 'rgba(244, 114, 182, 0.04)' }}>
          <div className="flex justify-center mb-4">
            <MessageCircle size={48} style={{ color: '#F472B6' }} strokeWidth={1.5} />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold mb-2" style={{ color: '#111827' }}>
            Nothing here yet
          </h3>
          <p className="text-sm" style={{ color: '#6B7280' }}>
            Be the first to post something!
          </p>
        </div>
      ) : (
        <>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 sm:gap-4 space-y-3 sm:space-y-4">
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
