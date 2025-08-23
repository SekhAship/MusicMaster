const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Frontend origin
  credentials: true, 
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err.message));

// Routes
const menuRoutes = require('./routes/menuroutes'); 
const authRoutes = require('./routes/authroutes');
const orderRoutes = require('./routes/orderroutes'); // Make sure this file exists in ./routes/
const foodRoutes=require('./routes/foodroutes')

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

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🔗 MongoDB URI: ${process.env.MONGO_URI}`);
});
