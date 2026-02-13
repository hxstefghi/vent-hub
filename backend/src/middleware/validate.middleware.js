import { body, query, validationResult } from 'express-validator';

/**
 * Middleware to handle validation errors
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  
  next();
};

/**
 * Validation rules for creating a post
 */
export const validatePost = [
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Content is required')
    .isLength({ min: 1, max: 1000 })
    .withMessage('Content must be between 1 and 1000 characters'),
  
  body('displayName')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Display name must not exceed 50 characters'),
  
  body('mood')
    .notEmpty()
    .withMessage('Mood is required')
    .isIn(['happy', 'sad', 'angry', 'anxious'])
    .withMessage('Mood must be one of: happy, sad, angry, anxious'),
  
  handleValidationErrors
];

/**
 * Validation rules for pagination and filtering
 */
export const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be between 1 and 50'),
  
  query('mood')
    .optional()
    .isIn(['happy', 'sad', 'angry', 'anxious'])
    .withMessage('Mood must be one of: happy, sad, angry, anxious'),
  
  query('sortBy')
    .optional()
    .isIn(['latest', 'oldest', 'mostLiked'])
    .withMessage('Sort by must be one of: latest, oldest, mostLiked'),
  
  handleValidationErrors
];
