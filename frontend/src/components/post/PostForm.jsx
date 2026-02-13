import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, Lock } from 'lucide-react'
import api from '../../api/axios'
import Button from '../ui/Button'

function PostForm() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    content: '',
    displayName: '',
    mood: 'happy',
    color: 'yellow'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.content.trim()) {
      setError('Please share your thoughts')
      return
    }

    if (formData.content.length > 1000) {
      setError('Your thoughts must be 1000 characters or less')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      await api.post('/posts', {
        content: formData.content.trim(),
        displayName: formData.displayName.trim() || 'Anonymous',
        mood: formData.mood,
        color: formData.color
      });

      setSuccess(true);
      setFormData({
        content: '',
        displayName: '',
        mood: 'happy',
        color: 'yellow'
      })

      // Redirect to home after 1.5 seconds
      setTimeout(() => {
        navigate('/')
      }, 1500)
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to create post. Please try again.'
      setError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const characterCount = formData.content.length
  const characterLimit = 1000
  const isOverLimit = characterCount > characterLimit

  const colorOptions = [
    { value: 'yellow', label: 'Yellow', bg: '#FEF3C7', preview: '#FEF08A' },
    { value: 'pink', label: 'Pink', bg: '#FCE7F3', preview: '#FBCFE8' },
    { value: 'blue', label: 'Blue', bg: '#DBEAFE', preview: '#BFDBFE' },
    { value: 'green', label: 'Green', bg: '#D1FAE5', preview: '#A7F3D0' },
    { value: 'purple', label: 'Purple', bg: '#EDE9FE', preview: '#DDD6FE' },
    { value: 'orange', label: 'Orange', bg: '#FFEDD5', preview: '#FED7AA' },
  ]

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="space-y-5">
        {/* Success Message */}
        {success && (
          <div className="alert alert-success">
            <div className="flex items-center gap-2">
              <CheckCircle size={16} />
              <p className="font-medium text-sm">Your thoughts have been shared!</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="alert alert-error">
            <p className="font-medium text-sm">{error}</p>
          </div>
        )}

        {/* Display Name Input */}
        <div>
          <label htmlFor="displayName" className="block text-sm font-medium mb-2" style={{ color: '#111827' }}>
            Display Name (Optional)
          </label>
          <input
            id="displayName"
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
            placeholder="Anonymous"
            maxLength={50}
            className="input-field"
          />
        </div>

        {/* Mood Selector */}
        <div>
          <label htmlFor="mood" className="block text-sm font-medium mb-2" style={{ color: '#111827' }}>
            How are you feeling? <span style={{ color: '#F472B6' }}>*</span>
          </label>
          <select
            id="mood"
            name="mood"
            value={formData.mood}
            onChange={handleChange}
            required
            className="select-field"
          >
            <option value="happy">Happy</option>
            <option value="sad">Sad</option>
            <option value="angry">Angry</option>
            <option value="anxious">Anxious</option>
          </select>
        </div>

        {/* Color Picker */}
        <div>
          <label className="block text-sm font-medium mb-3" style={{ color: '#111827' }}>
            Choose a note color
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {colorOptions.map((color) => (
              <button
                key={color.value}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, color: color.value }))}
                className="relative flex flex-col items-center gap-2 p-3 rounded-lg transition-all"
                style={{
                  backgroundColor: formData.color === color.value ? color.bg : 'transparent',
                  border: formData.color === color.value ? `2px solid ${color.preview}` : '2px solid transparent'
                }}
              >
                <div
                  className="w-full h-12 rounded-md shadow-sm"
                  style={{ backgroundColor: color.preview }}
                />
                <span className="text-xs font-medium" style={{ color: '#6B7280' }}>
                  {color.label}
                </span>
                {formData.color === color.value && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F472B6' }}>
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content Textarea */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-2" style={{ color: '#111827' }}>
            What's on your mind? <span style={{ color: '#F472B6' }}>*</span>
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Share your thoughts..."
            required
            rows={6}
            className={`textarea-field ${isOverLimit ? 'border-red-400 focus:ring-red-400' : ''}`}
          />
          <div className="flex items-center justify-end mt-1.5">
            <p className={`text-xs font-medium ${isOverLimit ? 'text-red-500' : characterCount > 900 ? 'text-yellow-600' : ''}`}
              style={!isOverLimit && characterCount <= 900 ? { color: '#9CA3AF' } : {}}>
              {characterCount} / {characterLimit}
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting || success || isOverLimit || !formData.content.trim()}
            fullWidth
          >
            {isSubmitting ? 'Sharing...' : 'Share Your Thoughts'}
          </Button>
        </div>

        {/* Privacy Note */}
        <div className="flex items-start gap-2 p-4 rounded-lg" style={{ backgroundColor: 'rgba(244, 114, 182, 0.06)' }}>
          <Lock size={14} className="mt-0.5 shrink-0" style={{ color: '#F472B6' }} />
          <p className="text-xs" style={{ color: '#6B7280' }}>
            Completely anonymous. No tracking, no personal information stored.
          </p>
        </div>
      </div>
    </form>
  )
}

export default PostForm
