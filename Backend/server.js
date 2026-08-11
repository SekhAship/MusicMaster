const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();

// Middleware - Allow requesting origin dynamically for Vercel & localhost
app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(express.json());

// MongoDB Serverless Connection Caching
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb && mongoose.connection.readyState === 1) {
    return cachedDb;
  }
  
  mongoose.set('bufferCommands', false);

  const db = await mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
  });
  cachedDb = db;
  console.log('✅ MongoDB connected');
  return db;
}

// Ensure DB is connected before handling any API route
app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (err) {
    console.error('❌ DB connection error:', err.message);
    res.status(500).json({ message: 'Database connection failed: ' + err.message });
  }
});

// Routes
const authRoutes = require('./routes/authroutes');
const orderRoutes = require('./routes/orderroutes');
const foodRoutes = require('./routes/foodroutes');

app.use('/api/menu', foodRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/menu', express.static('public/menu'));


// Optional test route
app.get('/', (req, res) => {
  res.send('🚀 Backend is running');
});

// Handle 404 routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Server Start — listen locally, export for Vercel serverless
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`🔗 MongoDB URI: ${process.env.MONGO_URI}`);
  });
}

module.exports = app;
