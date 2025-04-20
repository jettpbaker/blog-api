import express from 'express'
import posts from './router/posts.js'
import comments from './router/comments.js'
import users from './router/users.js'
import cors from 'cors'

const app = express()

const allowedOrigins = [process.env.CLIENT_URL]

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true)
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.'
      return callback(new Error(msg), false)
    }
    return callback(null, true)
  },
  credentials: true,
}

app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Mount routes
app.use('/api/posts', posts)
app.use('/api/users', users)

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
