import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { initializeDatabase } from './models/inventory.js'
import inventoryRoutes from './routes/inventory.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5000

// Initialize database
initializeDatabase()

// API routes
app.get('/api/status', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Pharmaceutical Management API is running',
    env: process.env.NODE_ENV || 'development'
  })
})

app.use('/api/inventory', inventoryRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  })
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
  console.log(`Inventory API: http://localhost:${PORT}/api/inventory`)
})
