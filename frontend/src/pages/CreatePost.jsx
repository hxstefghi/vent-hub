import { Link } from 'react-router-dom'
import { Lightbulb } from 'lucide-react'
import PostForm from '../components/post/PostForm'

function CreatePost() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-8 sm:py-12 lg:py-16 max-w-3xl px-4">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <Link
            to="/"
            className="inline-flex items-center text-xs sm:text-sm font-medium mb-6 sm:mb-8 transition-colors hover:opacity-70"
            style={{ color: '#F472B6' }}
          >
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back
          </Link>
          <h1 className="text-2xl sm:text-3xl font-semibold mb-2 sm:mb-3" style={{ color: '#111827' }}>
            Write a Post
          </h1>
          <p className="text-sm sm:text-base" style={{ color: '#6B7280', lineHeight: '1.6' }}>
            Write whatever's on your mind. No one will know it's you.
          </p>
        </div>

        {/* Form */}
        <PostForm />

        {/* Minimal Tips */}
        <div className="mt-6 sm:mt-8 p-4 sm:p-5 rounded-lg" style={{ backgroundColor: 'rgba(252, 231, 243, 0.3)' }}>
          <p className="text-xs flex items-start sm:items-center gap-2" style={{ color: '#6B7280' }}>
            <Lightbulb size={14} className="shrink-0 mt-0.5 sm:mt-0" style={{ color: '#F472B6' }} />
            <span>Leave the name empty if you want to be totally anonymous. Whatever you're feeling is okay to share.</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default CreatePost
