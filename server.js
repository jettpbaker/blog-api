import express from 'express'
import posts from './router/posts.js'
import users from './router/users.js'
import cors from 'cors'
import { errorHandler } from './middleware/errorHandler.js'

const app = express()

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
}

app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/posts', posts)
app.use('/api/users', users)

// Health check endpoint
app.get('/', (req, res) => res.send('OK'))

app.use(errorHandler)

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
