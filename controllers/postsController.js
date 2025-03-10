import {
  getAllPosts,
  createPost as newPost,
  getPostById,
  deletePostById,
  publishPostById,
} from '../services/postService.js'

export const getPosts = async (req, res) => {
  const posts = await getAllPosts()
  res.json(posts)
}

export const getPost = async (req, res) => {
  const id = Number(req.params.id)
  const post = await getPostById(id)
  if (!post) {
    return res.status(404).json({ message: 'Post not found' })
  }
  res.status(200).json(post)
}

export const createPost = async (req, res) => {
  const { title, content, comments, published, createdAt } = req.body
  const authorId = Number(req.body.authorId)

  const post = {
    title,
    content,
    author: {
      connect: { id: authorId },
    },
    comments,
    published,
    createdAt,
  }

  const createdPost = await newPost(post)
  res.status(201).json(createdPost)
}

/*
model Post {
    id        Int      @id @default(autoincrement())
    title     String
    content   String   @db.Text
    author    User   @relation(fields: [authorId], references: [id])
    authorId  Int
    comments  Comment[]
    published Boolean  @default(false)
    createdAt DateTime @default(now())
  }   
*/

export const deletePost = async (req, res) => {
  const id = Number(req.params.id)
  const deletedPost = await deletePostById(id)

  if (!deletedPost) {
    return res.status(404).json({ message: 'Post to delete not found' })
  }
  res.status(200).json({ message: 'Post deleted' })
}

export const updatePost = async (req, res) => {
  const id = Number(req.params.id)
  const updatedPost = await publishPostById(id)

  if (!updatedPost) {
    return res.status(404).json({ message: 'Post to update not found' })
  }
  res.status(200).json({ message: 'Post published' })
}
