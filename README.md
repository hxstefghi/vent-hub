# Vent Hub

> A safe space to share your thoughts anonymously. No sign-ups. No tracking. Just real people who get it.

![Version](https://img.shields.io/badge/version-1.0.0-pink?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)
![Node](https://img.shields.io/badge/node-%3E%3D18-green?style=flat-square)
![MongoDB](https://img.shields.io/badge/MongoDB-8-green?style=flat-square)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square)

---

## Overview

Vent Hub is a full-stack anonymous thought-sharing platform that lets people express what's on their minds without fear of judgment or identification. There are no accounts, no emails, no tracking — just a simple feed of anonymous posts that anyone can read, like, and contribute to.

The project is built with a **Node.js/Express/MongoDB** backend API and a **React + Vite + Tailwind CSS 4** frontend, designed with a soft, calming pink-themed UI to create a psychologically safe environment.

---

## Features

- **Anonymous posting** — No authentication, no accounts, no personal data collected.
- **Colored notes** — Choose from 6 pastel colors (yellow, pink, blue, green, purple, orange) to personalize your post.
- **Optional display names** — Pick a name or stay as "Anonymous".
- **Like system** — Show support for others' posts with a single click.
- **Pagination & sorting** — Browse posts by latest, oldest, or most liked.
- **Rate limiting** — Abuse protection with IP-based throttling on posts and likes.
- **Input validation** — Server-side validation via express-validator with friendly error messages.
- **Responsive design** — Works seamlessly across mobile, tablet, and desktop.
- **Masonry layout** — Posts display in a dynamic column layout for a natural reading experience.
- **Health endpoint** — Simple uptime check for monitoring.

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | React 18 | UI library |
| | Vite 7 | Build tool and dev server |
| | React Router 6 | Client-side routing |
| | Tailwind CSS 4 | Utility-first styling |
| | Axios | HTTP client |
| | Lucide React | Icon library |
| **Backend** | Node.js | JavaScript runtime |
| | Express 4 | Web framework |
| | Mongoose 8 | MongoDB ODM |
| | express-validator | Input validation |
| | express-rate-limit | Rate limiting |
| **Database** | MongoDB 8 | Document store |
| **Dev Tools** | Nodemon | Auto-restart during development |
| | ESLint 9 | Code linting |

---

## Getting Started

### Prerequisites

- **Node.js** >= 18
- **MongoDB** >= 6 (local instance or [MongoDB Atlas](https://www.mongodb.com/atlas))
- **npm** (comes with Node.js)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/vent-hub.git
cd vent-hub
```

### 2. Set up environment variables

**Backend** — Create `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/vent-hub
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

**Frontend** — Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

> A template is available at `frontend/.env.example`.

### 3. Install dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 4. Start MongoDB

```bash
mongod
```

### 5. Run the application

In two separate terminals:

```bash
# Terminal 1 — Backend (with auto-reload)
cd backend
npm run dev

# Terminal 2 — Frontend
cd frontend
npm run dev
```

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:5000](http://localhost:5000)

---

## Project Structure

```
vent-hub/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                  # MongoDB connection setup
│   │   ├── controllers/
│   │   │   └── post.controller.js     # Request handlers for posts
│   │   ├── middleware/
│   │   │   ├── error.middleware.js     # Centralized error handler + AppError class
│   │   │   ├── rateLimit.middleware.js # Rate limiters (posts, likes, general)
│   │   │   └── validate.middleware.js  # express-validator rules
│   │   ├── models/
│   │   │   └── Post.js                # Mongoose schema & model
│   │   ├── routes/
│   │   │   └── post.routes.js         # API route definitions
│   │   ├── services/
│   │   │   └── post.service.js        # Business logic layer
│   │   ├── utils/
│   │   │   └── generateNickname.js    # Random nickname generator utility
│   │   └── app.js                     # Express app setup & middleware
│   ├── server.js                      # Entry point
│   ├── package.json
│   └── .env                           # (not tracked)
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js               # Axios instance with interceptors
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Layout.jsx         # Shell (Navbar + Outlet + Footer)
│   │   │   │   └── Navbar.jsx         # Top navigation bar
│   │   │   ├── post/
│   │   │   │   ├── PostCard.jsx       # Individual post display card
│   │   │   │   ├── PostForm.jsx       # Create post form
│   │   │   │   └── PostList.jsx       # Paginated post feed with filters
│   │   │   └── ui/
│   │   │       ├── Button.jsx         # Reusable button component
│   │   │       └── Input.jsx          # Reusable input component
│   │   ├── pages/
│   │   │   ├── Home.jsx               # Landing page (hero + features + posts)
│   │   │   └── CreatePost.jsx         # Create post page
│   │   ├── routes/
│   │   │   └── AppRoutes.jsx          # Route definitions
│   │   ├── App.jsx                    # Root component with BrowserRouter
│   │   ├── main.jsx                   # React entry point
│   │   └── index.css                  # Tailwind + design system
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── .env.example
│
├── .gitignore
├── package.json                       # Root (shared deps like lucide-react)
└── README.md                          # This file
```

---

## API Reference

All API endpoints are prefixed with `/api`.

### Health Check

```
GET /api/health
```

Returns server status and current timestamp.

**Response `200`:**

```json
{
  "status": "success",
  "message": "Vent Hub API is running",
  "timestamp": "2026-06-20T12:00:00.000Z"
}
```

---

### Create a Post

```
POST /api/posts
```

Rate-limited to **5 requests per 15 minutes per IP**.

**Request Body:**

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| `content` | string | yes | — | Post text (1–1000 characters) |
| `displayName` | string | no | `"Anonymous"` | Display name (max 50 chars) |
| `color` | string | no | `"yellow"` | Note color: `yellow`, `pink`, `blue`, `green`, `purple`, `orange` |

**Response `201`:**

```json
{
  "status": "success",
  "message": "Post created successfully",
  "data": {
    "post": {
      "_id": "...",
      "content": "Feeling grateful today.",
      "displayName": "Anonymous",
      "color": "yellow",
      "likes": 0,
      "createdAt": "2026-06-20T12:00:00.000Z",
      "updatedAt": "2026-06-20T12:00:00.000Z"
    }
  }
}
```

---

### Get All Posts

```
GET /api/posts?page=1&limit=10&sortBy=latest
```

**Query Parameters:**

| Param | Type | Default | Options | Description |
|---|---|---|---|---|
| `page` | int | 1 | >= 1 | Page number |
| `limit` | int | 10 | 1–50 | Posts per page |
| `sortBy` | string | `"latest"` | `latest`, `oldest`, `mostLiked` | Sort order |

**Response `200`:**

```json
{
  "status": "success",
  "data": {
    "posts": [ ... ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalPosts": 48,
      "postsPerPage": 10,
      "hasNextPage": true,
      "hasPreviousPage": false
    }
  }
}
```

---

### Get a Single Post

```
GET /api/posts/:id
```

**Response `200`:** Returns the post object inside `data.post`.

**Error `400`:** Invalid ObjectId format or post not found.

---

### Like a Post

```
PATCH /api/posts/:id/like
```

Rate-limited to **30 requests per minute per IP**.

Increments the `likes` counter by 1. Idempotent in the sense that each request adds one like (no user tracking, so repeated requests by the same person are counted separately).

**Response `200`:**

```json
{
  "status": "success",
  "message": "Post liked successfully",
  "data": { "post": { ... } }
}
```

---

### Delete a Post

```
DELETE /api/posts/:id
```

**Response `200`:**

```json
{
  "status": "success",
  "message": "Post deleted successfully"
}
```

---

### Get Posts Statistics

```
GET /api/posts/stats
```

**Response `200`:**

```json
{
  "status": "success",
  "data": {
    "stats": {
      "totalPosts": 48,
      "byMood": {
        "yellow": 20,
        "pink": 10,
        "blue": 8,
        "green": 5,
        "purple": 3,
        "orange": 2
      }
    }
  }
}
```

> Note: The `byMood` field currently groups by `color` (the field in the schema is labeled "mood" in the aggregation pipeline).

---

### Rate Limiting

| Limiter | Window | Max Requests | Applied To |
|---|---|---|---|
| Post creation | 15 minutes | 5 | `POST /api/posts` |
| Like | 1 minute | 30 | `PATCH /api/posts/:id/like` |
| General | 15 minutes | 100 | All endpoints |

When exceeded, the API returns `429 Too Many Requests`:

```json
{
  "status": "error",
  "message": "Too many posts created from this IP, please try again after 15 minutes"
}
```

---

### Validation Rules

| Field | Rules |
|---|---|
| `content` | Required, trimmed, 1–1000 characters |
| `displayName` | Optional, trimmed, max 50 characters |
| `color` | Optional, must be one of: `yellow`, `pink`, `blue`, `green`, `purple`, `orange` |
| `page` | Optional, positive integer |
| `limit` | Optional, integer between 1–50 |
| `sortBy` | Optional, one of: `latest`, `oldest`, `mostLiked` |

Validation errors return `400`:

```json
{
  "status": "error",
  "message": "Validation failed",
  "errors": [
    { "field": "content", "message": "Content is required" }
  ]
}
```

---

### Error Handling

All errors are caught by the centralized error middleware (`error.middleware.js`). Known error types:

| Error Type | Status Code | Description |
|---|---|---|
| ValidationError (Mongoose) | 400 | Schema validation failed |
| CastError (Mongoose) | 400 | Invalid ObjectId |
| Duplicate key (11000) | 400 | Duplicate field value |
| Post not found | 500 | Thrown by service layer |
| Generic | 500 | Fallback internal error |

In development mode, error responses include a `stack` trace.

---

## Frontend Architecture

### Routing

```
/           → Layout → Home page (hero + features + post feed)
/create     → Layout → Create Post page (form)
```

The `Layout` component provides the sticky navbar, main content area via React Router's `<Outlet />`, and a footer. All routes are nested inside `Layout` to share the same chrome.

### Component Tree

```
App (BrowserRouter)
└── AppRoutes
    └── Layout
        ├── Navbar
        ├── Outlet
        │   ├── Home
        │   │   ├── Button
        │   │   └── PostList
        │   │       ├── PostCard (× N)
        │   │       └── Button (pagination)
        │   └── CreatePost
        │       └── PostForm
        │           ├── Input (display name)
        │           ├── color picker (6 buttons)
        │           ├── textarea (content)
        │           └── Button (submit)
        └── Footer
```

### Data Flow

1. `PostList` fetches posts from `GET /api/posts` on mount and on filter/page change.
2. Liking a post calls `PATCH /api/posts/:id/like` and optimistically updates the local count.
3. `PostForm` submits to `POST /api/posts`, shows a success state, then redirects to `/`.
4. All API calls go through the Axios instance defined in `src/api/axios.js`, which sets the base URL from `VITE_API_URL`.

---

## Design System

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| `--color-primary` | `#f472b6` | Buttons, links, accents |
| `--color-primary-light` | `#fbcfe8` | Hover states, light fills |
| `--color-primary-lighter` | `#fce7f3` | Backgrounds, secondary buttons |
| `--color-primary-hover` | `#ec4899` | Button hover state |
| `--color-text-primary` | `#111827` | Headings, body text |
| `--color-text-secondary` | `#6b7280` | Supporting text |
| `--color-text-muted` | `#9ca3af` | Placeholders, metadata |
| `--color-border` | `#f3f4f6` | Borders, dividers |

### Typography

- **Font:** Inter (Google Fonts) with system font fallback
- **Scale:** Clamp-based responsive sizing for headings
- **Line height:** 1.7 for body, 1.3 for headings

### Components

- **Button** — Three variants: `primary` (pink filled), `secondary` (pink tinted), `outline` (bordered). Supports `fullWidth` and `disabled` states.
- **Input** — Labeled text input with error state support.
- **PostCard** — Masonry-friendly note card with color accent, avatar initial, relative timestamp, and like button.
- **PostForm** — Multi-field form with optional name, 6-color picker, character-limited textarea with live counter.
- **PostList** — Paginated grid with sort dropdown (Latest / Oldest / Most Liked), loading spinner, and empty state.

---

## Deployment

### Backend

Deploy the `backend/` directory to any Node.js host (Railway, Render, Fly.io, or a VPS).

Required environment variables:

```env
PORT=5000
MONGO_URI=<your-mongodb-connection-string>
NODE_ENV=production
CLIENT_URL=<your-frontend-url>
```

Start with:

```bash
npm start
```

### Frontend

Build the static files:

```bash
cd frontend
npm run build    # outputs to dist/
```

Serve `dist/` via any static host (Vercel, Netlify, Cloudflare Pages, or an nginx server).

Set `VITE_API_URL` to point at your deployed backend during the build.

---

## Environment Variables Reference

### Backend (`backend/.env`)

| Variable | Required | Default | Description |
|---|---|---|---|
| `PORT` | no | `5000` | Server port |
| `MONGO_URI` | yes | — | MongoDB connection string |
| `NODE_ENV` | no | `development` | Environment (`development` / `production`) |
| `CLIENT_URL` | no | `http://localhost:5173` | Allowed CORS origin |

### Frontend (`frontend/.env`)

| Variable | Required | Default | Description |
|---|---|---|---|
| `VITE_API_URL` | no | `http://localhost:5000/api` | Backend API base URL |

---

## License

[MIT](LICENSE)

---

Built by [Christian Catuday](https://github.com/anomalyco).
