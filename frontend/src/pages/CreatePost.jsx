import { Link } from 'react-router-dom'
import { Lightbulb } from 'lucide-react'
import PostForm from '../components/post/PostForm'

function CreatePost() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-16 max-w-3xl">
        {/* Header */}
        <div className="mb-12">
          <Link
            to="/"
            className="inline-flex items-center text-sm font-medium mb-8 transition-colors hover:opacity-70"
            style={{ color: '#F472B6' }}
          >
            <svg
              className="w-4 h-4 mr-1.5"
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
          <h1 className="text-3xl font-semibold mb-3" style={{ color: '#111827' }}>
            Share Your Thoughts
          </h1>
          <p className="text-base" style={{ color: '#6B7280', lineHeight: '1.6' }}>
            Express yourself in a safe, anonymous space. Choose your mood and color.
          </p>
        </div>

        {/* Form */}
        <PostForm />

        {/* Minimal Tips */}
        <div className="mt-8 p-5 rounded-lg" style={{ backgroundColor: 'rgba(252, 231, 243, 0.3)' }}>
          <p className="text-xs flex items-center gap-2" style={{ color: '#6B7280' }}>
            <Lightbulb size={14} style={{ color: '#F472B6' }} />
            <span>Leave the name field blank to stay completely anonymous. Every thought is valid.</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default CreatePost
