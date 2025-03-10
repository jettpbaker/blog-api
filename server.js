import express from 'express'
import posts from './router/posts.js'
import comments from './router/comments.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/posts', posts)
app.use('/api/comments', comments)

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
