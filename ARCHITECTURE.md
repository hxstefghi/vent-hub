# 🏗️ Vent Hub - Architecture Documentation

Comprehensive guide to the architecture, design decisions, and code organization of Vent Hub.

## 📐 Architecture Overview

Vent Hub follows **Clean Architecture** principles with clear separation of concerns.

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Client (React)                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────────┐ │
│  │  Pages   │→ │Components│→ │  API Layer (Axios)   │ │
│  └──────────┘  └──────────┘  └──────────────────────┘ │
└────────────────────────────┬────────────────────────────┘
                             │ HTTP/REST
                             ↓
┌─────────────────────────────────────────────────────────┐
│                  Server (Express.js)                    │
│  ┌─────────┐  ┌────────────┐  ┌──────────┐            │
│  │ Routes  │→ │Controllers │→ │ Services │→ MongoDB   │
│  └─────────┘  └────────────┘  └──────────┘            │
│       ↓             ↓              ↓                    │
│  Middleware    Validation    Business Logic            │
└─────────────────────────────────────────────────────────┘
```

## 🔧 Backend Architecture

### Layer Responsibilities

#### 1. Routes Layer (`routes/`)
**Purpose:** Define API endpoints and HTTP methods

```javascript
// Routes only define endpoints, no logic
router.post('/', createPostLimiter, validatePost, postController.createPost);
router.get('/', validatePagination, postController.getAllPosts);
```

**Responsibilities:**
- Map HTTP methods to controller functions
- Apply middleware (validation, rate limiting)
- Define route parameters

#### 2. Controllers Layer (`controllers/`)
**Purpose:** Handle HTTP requests and responses

```javascript
// Controllers handle request/response, delegate to services
async createPost(req, res, next) {
  try {
    const post = await postService.createPost(req.body);
    res.status(201).json({ status: 'success', data: { post } });
  } catch (error) {
    next(error);
  }
}
```

**Responsibilities:**
- Extract data from requests
- Call service layer
- Format responses
- Error handling delegation

#### 3. Services Layer (`services/`)
**Purpose:** Implement business logic

```javascript
// Services contain all business logic
async createPost(postData) {
  const post = await Post.create({
    content,
    displayName: displayName?.trim() || 'Anonymous',
    mood
  });
  return post;
}
```

**Responsibilities:**
- Business rule implementation
- Data transformation
- Database operations
- Complex queries and aggregations

#### 4. Models Layer (`models/`)
**Purpose:** Define data structure and validation

```javascript
// Models define schema and validations
const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'Content is required'],
    minlength: [1, 'Content must be at least 1 character'],
    maxlength: [1000, 'Content must not exceed 1000 characters']
  },
  // ...
});
```

**Responsibilities:**
- Schema definition
- Model-level validations
- Virtual fields
- Instance methods
- Static methods

#### 5. Middleware Layer (`middleware/`)
**Purpose:** Request preprocessing and validation

```javascript
// Middleware intercepts requests
export const validatePost = [
  body('content').trim().notEmpty().isLength({ min: 1, max: 1000 }),
  body('mood').isIn(['happy', 'sad', 'angry', 'anxious']),
  handleValidationErrors
];
```

**Responsibilities:**
- Input validation
- Rate limiting
- Error handling
- Request transformation

### Data Flow

```
Request → Route → Middleware → Controller → Service → Model → Database
                                                              ↓
Response ← Route ← Middleware ← Controller ← Service ← Model ← Database
```

## 🎨 Frontend Architecture

### Component Hierarchy

```
App.jsx
└── BrowserRouter
    └── AppRoutes
        └── Layout
            ├── Navbar
            └── Outlet
                ├── Home (Page)
                │   ├── PostList
                │   │   └── PostCard (multiple)
                │   └── Button
                └── CreatePost (Page)
                    └── PostForm
                        ├── Input
                        └── Button
```

### Component Types

#### 1. Page Components (`pages/`)
**Purpose:** Top-level route components

```javascript
// Pages orchestrate multiple components
function Home() {
  return (
    <div>
      <HeroSection />
      <PostList />
    </div>
  );
}
```

**Characteristics:**
- Map to routes
- Compose smaller components
- Handle page-level state
- Fetch data

#### 2. Layout Components (`components/layout/`)
**Purpose:** Define page structure

```javascript
// Layouts provide consistent structure
function Layout() {
  return (
    <div>
      <Navbar />
      <main><Outlet /></main>
      <Footer />
    </div>
  );
}
```

**Characteristics:**
- Persistent across routes
- Global navigation
- Common page structure

#### 3. Feature Components (`components/post/`)
**Purpose:** Feature-specific functionality

```javascript
// Feature components handle specific domain logic
function PostCard({ post, onLike }) {
  const [likes, setLikes] = useState(post.likes);
  // Post-specific logic
}
```

**Characteristics:**
- Domain-specific
- Contain business logic
- Manage local state
- Handle API calls

#### 4. UI Components (`components/ui/`)
**Purpose:** Reusable interface elements

```javascript
// UI components are pure and reusable
function Button({ children, variant, onClick }) {
  return (
    <button className={getVariantClass(variant)} onClick={onClick}>
      {children}
    </button>
  );
}
```

**Characteristics:**
- No business logic
- Highly reusable
- Prop-driven
- Styled consistently

### State Management Strategy

#### Local State (useState)
- Component-specific data
- Form inputs
- UI toggles

#### Lifted State
- Shared between sibling components
- Post lists
- Filters

#### API State
- Fetched from backend
- Managed in feature components
- Cached when appropriate

## 🔐 Security Architecture

### Backend Security Layers

```
Request
  ↓
1. Rate Limiting (IP-based)
  ↓
2. CORS (Origin validation)
  ↓
3. Input Validation (express-validator)
  ↓
4. Sanitization (trim, escape)
  ↓
5. Database Validation (Mongoose)
  ↓
6. Error Handling (centralized)
```

### Security Features

#### 1. Rate Limiting
```javascript
// Prevents abuse
createPostLimiter: 5 requests / 15 minutes
likeLimiter: 30 requests / minute
generalLimiter: 100 requests / 15 minutes
```

#### 2. Input Validation
```javascript
// Multiple validation layers
- Route level (express-validator)
- Service level (business rules)
- Model level (Mongoose validators)
```

#### 3. No User Tracking
- No authentication
- No IP storage
- No cookies
- No sessions

## 📊 Database Design

### Schema Design Principles

1. **Simplicity**: Single collection (Posts)
2. **No Relations**: Fully denormalized
3. **Indexes**: Optimized for common queries

### Post Document Structure

```javascript
{
  _id: ObjectId,
  content: String,
  displayName: String,
  mood: String (enum),
  likes: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Indexes

```javascript
// Optimize for:
1. Latest posts: { createdAt: -1 }
2. Popular posts: { likes: -1 }
3. Mood filtering: { mood: 1 }
```

## 🔄 API Design

### RESTful Principles

```
GET    /posts       - List resources
POST   /posts       - Create resource
GET    /posts/:id   - Read resource
PATCH  /posts/:id/like - Update resource (specific action)
DELETE /posts/:id   - Delete resource
```

### Response Format

**Success Response:**
```json
{
  "status": "success",
  "message": "Operation successful",
  "data": {
    "post": { /* post object */ }
  }
}
```

**Error Response:**
```json
{
  "status": "error",
  "message": "Error description",
  "errors": [ /* validation errors */ ]
}
```

### Pagination

```javascript
{
  posts: [...],
  pagination: {
    currentPage: 1,
    totalPages: 10,
    totalPosts: 95,
    postsPerPage: 10,
    hasNextPage: true,
    hasPreviousPage: false
  }
}
```

## 🎯 Design Patterns

### Backend Patterns

#### 1. Service Pattern
```javascript
// Separate business logic from controllers
class PostService {
  async createPost(data) { /* logic */ }
  async getAllPosts(options) { /* logic */ }
}
```

#### 2. Middleware Pattern
```javascript
// Composable request processors
router.post('/', 
  rateLimiter,
  validateInput,
  controller.create
);
```

#### 3. Error Handling Pattern
```javascript
// Centralized error management
app.use(errorHandler);
// All errors flow to one place
```

### Frontend Patterns

#### 1. Container/Presentational
```javascript
// Container: Data fetching
function PostList() {
  const [posts, setPosts] = useState([]);
  // Fetch and manage data
  return posts.map(post => <PostCard post={post} />);
}

// Presentational: Pure display
function PostCard({ post }) {
  // Only display, no data fetching
}
```

#### 2. Compound Components
```javascript
<Layout>
  <Navbar />
  <Outlet />
  <Footer />
</Layout>
```

#### 3. Custom Hooks (Future Enhancement)
```javascript
// Reusable logic
function usePosts() {
  const [posts, setPosts] = useState([]);
  // Fetch and return posts
  return { posts, loading, error };
}
```

## 🚀 Performance Considerations

### Backend Optimizations

1. **Database Indexes**: Fast queries
2. **Pagination**: Limit data transfer
3. **Lean Queries**: Remove Mongoose overhead
4. **Parallel Queries**: Promise.all()

### Frontend Optimizations

1. **Code Splitting**: Vite automatic
2. **Lazy Loading**: React.lazy()
3. **Optimistic Updates**: Immediate UI feedback
4. **Debouncing**: Rate limit user actions

## 🧪 Testing Strategy (Future)

### Backend Testing
```
Unit Tests → Services
Integration Tests → API endpoints
E2E Tests → Full user flows
```

### Frontend Testing
```
Unit Tests → Components
Integration Tests → Page flows
E2E Tests → Cypress/Playwright
```

## 📈 Scalability Considerations

### Current Architecture
- Single server
- Shared database
- Stateless design

### Future Enhancements
1. **Caching**: Redis for popular posts
2. **CDN**: Static asset delivery
3. **Load Balancing**: Multiple servers
4. **Database Sharding**: Horizontal scaling
5. **Microservices**: Separate services

## 🔮 Future Improvements

### Backend
- [ ] WebSocket for real-time updates
- [ ] Advanced moderation system
- [ ] Content filtering (profanity)
- [ ] Analytics tracking
- [ ] Email notifications

### Frontend
- [ ] Dark mode
- [ ] PWA support
- [ ] Offline capability
- [ ] Infinite scroll
- [ ] Share functionality
- [ ] Report system

---

This architecture provides a solid foundation for a scalable, maintainable, and secure application while remaining simple and understandable.
