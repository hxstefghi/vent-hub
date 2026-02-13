# 🌸 Vent Hub - Anonymous Thought Sharing Platform

A minimalist, safe-space web application where users can share their thoughts, confessions, and emotions completely anonymously. Built with the MERN stack (MongoDB, Express, React, Node.js).

## ✨ Features

- **100% Anonymous** - No login, no signup, no tracking
- **Privacy First** - No IP addresses or personal data stored
- **Safe Space** - Judgment-free environment for emotional expression
- **Mood Tracking** - Express emotions with mood tags (happy, sad, angry, anxious)
- **Interactive** - Like posts and filter by mood
- **Responsive Design** - Beautiful UI with Tailwind CSS
- **Rate Limited** - Protection against spam and abuse

## 🏗️ Architecture

This project follows **Clean Architecture** principles with a layered approach:

### Backend Structure
```
server/
├── src/
│   ├── config/          # Database configuration
│   ├── controllers/     # Request handlers
│   ├── services/        # Business logic
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── middleware/      # Validation, error handling, rate limiting
│   ├── utils/           # Helper functions
│   └── app.js          # Express app setup
├── server.js           # Entry point
└── .env                # Environment variables
```

### Frontend Structure
```
client/
├── src/
│   ├── api/            # API configuration
│   ├── components/     # Reusable components
│   │   ├── layout/     # Layout components
│   │   ├── post/       # Post-related components
│   │   └── ui/         # UI components
│   ├── pages/          # Page components
│   ├── routes/         # Route configuration
│   └── App.jsx         # Main app component
└── index.html          # HTML entry point
```

## 🎨 Design System

- **Primary Color**: Soft Pink (#F472B6)
- **Typography**: Clean and readable
- **Components**: Rounded corners, soft shadows
- **Responsive**: Mobile-first approach
- **Theme**: Calm, minimalist, emotionally comfortable

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   cd vent-hub
   ```

2. **Setup Backend**
   ```bash
   cd server
   npm install
   ```

3. **Setup Frontend**
   ```bash
   cd ../client
   npm install
   ```

4. **Configure Environment Variables**

   Backend (.env in server directory):
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/vent-hub
   CLIENT_URL=http://localhost:5173
   ```

   Frontend (.env in client directory):
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

5. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   ```

6. **Run the Application**

   Terminal 1 - Backend:
   ```bash
   cd server
   npm run dev
   ```

   Terminal 2 - Frontend:
   ```bash
   cd client
   npm run dev
   ```

7. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000/api

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### Health Check
- **GET** `/health` - Check API status

#### Posts
- **POST** `/posts` - Create a new post
- **GET** `/posts` - Get all posts (with pagination and filters)
- **GET** `/posts/:id` - Get a specific post
- **PATCH** `/posts/:id/like` - Like a post
- **DELETE** `/posts/:id` - Delete a post
- **GET** `/posts/stats` - Get posts statistics

### Request Examples

**Create a Post**
```json
POST /api/posts
{
  "content": "Feeling grateful today!",
  "displayName": "Happy Soul",
  "mood": "happy"
}
```

**Get Posts with Filters**
```
GET /api/posts?page=1&limit=10&mood=happy&sortBy=latest
```

**Like a Post**
```
PATCH /api/posts/:postId/like
```

## 🛡️ Security Features

- **Rate Limiting**: 
  - 5 posts per 15 minutes
  - 30 likes per minute
  - 100 general requests per 15 minutes
- **Input Validation**: Using express-validator
- **Error Handling**: Centralized error middleware
- **CORS Protection**: Configured allowed origins
- **No Data Tracking**: No IP addresses or user data stored

## 🧪 Testing the Application

1. Open http://localhost:5173
2. Click "Share Your Thoughts"
3. Fill in the form (name is optional)
4. Select your mood
5. Write your thoughts
6. Click "Share Anonymously"
7. View your post on the home page
8. Try filtering by mood and sorting options
9. Like posts by clicking the heart icon

## 📦 Tech Stack

**Backend:**
- Node.js - Runtime environment
- Express.js - Web framework
- MongoDB - Database
- Mongoose - ODM
- express-validator - Input validation
- express-rate-limit - Rate limiting
- CORS - Cross-origin resource sharing
- dotenv - Environment variables

**Frontend:**
- React 18 - UI library
- Vite - Build tool
- React Router - Navigation
- Axios - HTTP client
- Tailwind CSS - Styling

## 🌟 Key Features Explained

### Anonymous Posting
- No authentication required
- Optional display name (defaults to "Anonymous")
- No user tracking or data storage

### Mood Expression
- Four mood options: Happy, Sad, Angry, Anxious
- Visual mood indicators with emojis
- Filter posts by mood

### Post Interactions
- Like posts (increment only)
- View like counts
- No dislike or negative interactions

### Pagination & Filtering
- 10 posts per page
- Sort by latest, oldest, or most liked
- Filter by mood

## 🔧 Configuration

### MongoDB Connection
- Local: `mongodb://localhost:27017/vent-hub`
- Atlas: Update `MONGODB_URI` in server/.env

### Port Configuration
- Backend: Port 5000 (configurable in server/.env)
- Frontend: Port 5173 (configurable in client/vite.config.js)

## 📝 License

MIT License - Feel free to use this project for learning or personal use.

## 🤝 Contributing

This is a learning project. Feel free to fork and modify as needed.

## 📧 Support

For issues or questions, please open an issue in the repository.

---

**Made with 💗 for mental health awareness and emotional well-being**
