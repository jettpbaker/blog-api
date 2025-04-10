import {
  getAllPosts,
  createPost as newPost,
  getPostById,
  getPostAuthor,
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
  const { title, content, description } = req.body
  const authorId = Number(req.user.id)
  const published = req.user.admin

  const post = {
    title,
    content,
    description,
    author: {
      connect: { id: authorId },
    },
    published,
  }

  const createdPost = await newPost(post)
  res.status(201).json(createdPost)
}

export const deletePost = async (req, res) => {
  const postID = Number(req.params.id)
  const userID = Number(req.user.id)

  const author = await getPostAuthor(postID)

  if (!author) {
    return res.status(404).json({ message: 'Post to delete not found' })
  }

  const authorID = author.authorId

  if (userID !== authorID) {
    return res.status(403).json({ message: 'You did not author this post' })
  }

  await deletePostById(postID)
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
