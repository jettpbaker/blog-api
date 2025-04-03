import express from 'express'
import passport from './config/passport.js'
import posts from './router/posts.js'
import comments from './router/comments.js'
import auth from './router/auth.js'
import { isAuthed, isAdmin } from './middleware/authMiddleware.js'
import cors from 'cors'

const app = express()

const allowedOrigins = [process.env.CLIENT_URL]

console.log('Allowed CORS Origins:', allowedOrigins)

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

app.use('/api/posts', posts)
app.use('/api/comments', comments)
app.use('/auth', auth)

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
