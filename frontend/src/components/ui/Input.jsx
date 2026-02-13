function Input({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  required = false,
  maxLength,
  error,
  helperText,
  className = ''
}) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium mb-2" style={{ color: '#111827' }}>
          {label} {required && <span style={{ color: '#F472B6' }}>*</span>}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
        className={`input-field ${error ? 'border-red-400 focus:ring-red-400' : ''}`}
      />
      {helperText && (
        <p className={`mt-2 text-sm ${error ? 'text-red-600' : ''}`} style={!error ? { color: '#9CA3AF' } : {}}>
          {helperText}
        </p>
      )}
    </div>
  )
}

export default Input
