# 🚀 Vent Hub - Installation & Setup Guide

Complete guide to get Vent Hub running on your local machine.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download](https://git-scm.com/)
- **npm** (comes with Node.js)

### Verify Installation
```bash
node --version    # Should be v16 or higher
npm --version     # Should be 8 or higher
mongo --version   # Or check MongoDB Atlas connection
```

## 📥 Installation Steps

### Step 1: Navigate to Project Directory
```bash
cd vent-hub
```

### Step 2: Install Backend Dependencies

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install
```

**Dependencies installed:**
- express
- mongoose
- dotenv
- cors
- express-validator
- express-rate-limit

### Step 3: Install Frontend Dependencies

```bash
# Navigate to client directory (from root)
cd ../client

# Install dependencies
npm install
```

**Dependencies installed:**
- react
- react-dom
- react-router-dom
- axios
- vite
- tailwindcss

### Step 4: Setup Environment Variables

#### Backend Environment (.env in server/)
```bash
# Create .env file in server directory
cd server
```

Create a file named `.env` with the following content:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/vent-hub
CLIENT_URL=http://localhost:5173
```

**MongoDB Options:**

**Option A: Local MongoDB**
```env
MONGODB_URI=mongodb://localhost:27017/vent-hub
```

**Option B: MongoDB Atlas (Cloud)**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/vent-hub?retryWrites=true&w=majority
```

#### Frontend Environment (.env in client/)

Create a file named `.env` in the client directory:

```env
VITE_API_URL=http://localhost:5000/api
```

### Step 5: Start MongoDB

#### If using Local MongoDB:

**Windows:**
```bash
# Open a new terminal
mongod
```

**macOS/Linux:**
```bash
# Open a new terminal
sudo systemctl start mongod
# or
brew services start mongodb-community
```

#### If using MongoDB Atlas:
- No action needed, just ensure your connection string is correct in `.env`

### Step 6: Run the Application

You'll need **2 terminal windows**:

#### Terminal 1 - Backend Server

```bash
# Navigate to server directory
cd server

# Run development server
npm run dev
```

You should see:
```
🚀 Server is running on port 5000
📝 Environment: development
✅ MongoDB Connected: localhost
📦 Database: vent-hub
```

#### Terminal 2 - Frontend Server

```bash
# Navigate to client directory
cd client

# Run development server
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Step 7: Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

## ✅ Verification Checklist

- [ ] Backend server running on port 5000
- [ ] Frontend server running on port 5173
- [ ] MongoDB connection successful
- [ ] Can access http://localhost:5173
- [ ] Can create a post
- [ ] Can view posts on home page
- [ ] Can like a post
- [ ] Can filter posts by mood

## 🧪 Test the Application

1. **Create a Post:**
   - Click "Share Your Thoughts"
   - Enter your thoughts (name is optional)
   - Select a mood
   - Click "Share Anonymously"

2. **View Posts:**
   - Return to home page
   - See your post displayed
   - Try filtering by mood
   - Try different sort options

3. **Like Posts:**
   - Click the heart icon on any post
   - See the like count increase

## 🐛 Troubleshooting

### Problem: Backend won't start

**Error: MongoDB connection failed**
```
Solution:
1. Check if MongoDB is running: mongod
2. Verify MONGODB_URI in .env
3. For Atlas, check your IP whitelist
```

**Error: Port 5000 already in use**
```bash
Solution:
# Change PORT in server/.env to 5001
PORT=5001

# Update client/.env
VITE_API_URL=http://localhost:5001/api
```

### Problem: Frontend won't start

**Error: Port 5173 already in use**
```bash
Solution:
# Update vite.config.js
server: {
  port: 5174
}
```

**Error: Cannot connect to backend**
```
Solution:
1. Check backend is running
2. Verify VITE_API_URL in client/.env
3. Check CORS settings in server/src/app.js
```

### Problem: MongoDB connection issues

**Local MongoDB:**
```bash
# Check if MongoDB is running
ps aux | grep mongod    # macOS/Linux
tasklist | findstr mongod   # Windows

# Start MongoDB
mongod
```

**MongoDB Atlas:**
```
1. Check connection string
2. Verify IP whitelist (allow 0.0.0.0/0 for testing)
3. Check username/password
```

## 🔧 Development Tips

### Hot Reload

Both frontend and backend support hot reload:
- Backend: Uses nodemon (already configured)
- Frontend: Uses Vite (automatic)

### Database Management

**View Database:**
```bash
# MongoDB Shell
mongosh
use vent-hub
db.posts.find()
```

**Clear Database:**
```bash
mongosh
use vent-hub
db.posts.deleteMany({})
```

### Reset Project

```bash
# Remove all node_modules
cd server && rm -rf node_modules
cd ../client && rm -rf node_modules

# Reinstall
cd server && npm install
cd ../client && npm install
```

## 📦 Production Build

### Build Frontend
```bash
cd client
npm run build
```

Output will be in `client/dist/`

### Serve Production Build
```bash
cd client
npm run preview
```

## 🌐 Environment-Specific Configuration

### Development
- Backend: http://localhost:5000
- Frontend: http://localhost:5173
- MongoDB: Local or Atlas

### Production
Update `.env` files:

**Server:**
```env
NODE_ENV=production
MONGODB_URI=<production-mongodb-uri>
CLIENT_URL=<production-frontend-url>
```

**Client:**
```env
VITE_API_URL=<production-api-url>
```

## 📚 Additional Resources

- [Node.js Documentation](https://nodejs.org/docs/)
- [React Documentation](https://react.dev/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express Documentation](https://expressjs.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 💡 Next Steps

1. Explore the codebase
2. Modify colors in `client/tailwind.config.js`
3. Add new features
4. Customize validation rules
5. Deploy to production

## 🆘 Need Help?

- Check the main README.md for architecture details
- Review the code comments
- Check MongoDB connection
- Verify all dependencies are installed
- Ensure ports are not in use

---

**Happy Coding! 🎉**
