import {
  getAllPosts,
  createPost as newPost,
  getPostById,
  getPostAuthor,
  deletePostById,
  togglePostPublishedById,
  getUserPosts as getAuthorPosts,
  updatePostContentById,
} from '../services/postService.js'
import { createApiError } from '../middleware/errorHandler.js'

export const getPosts = async (req, res, next) => {
  try {
    const posts = await getAllPosts()
    res.json(posts)
  } catch (err) {
    next(err)
  }
}

export const getPost = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const post = await getPostById(id)
    if (!post) {
      return next(createApiError(404, 'Post not found'))
    }
    res.status(200).json(post)
  } catch (err) {
    next(err)
  }
}

export const createPost = async (req, res, next) => {
  try {
    const { title, content, description } = req.body
    if (!title || !content) {
      return next(createApiError(400, 'Title and content are required'))
    }

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
  } catch (err) {
    next(err)
  }
}

export const deletePost = async (req, res, next) => {
  try {
    const postID = Number(req.params.id)
    const userID = Number(req.user.id)

    const author = await getPostAuthor(postID)

    if (!author) {
      return next(createApiError(404, 'Post to delete not found'))
    }

    const authorID = author.authorId

    if (userID !== authorID) {
      return next(createApiError(403, 'You did not author this post'))
    }

    await deletePostById(postID)
    res.status(200).json({ message: 'Post deleted' })
  } catch (err) {
    next(err)
  }
}

export const togglePublishPost = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const updatedPost = await togglePostPublishedById(id)

    if (!updatedPost) {
      return next(createApiError(404, 'Post to update not found'))
    }
    res.status(200).json({ message: 'Post published' })
  } catch (err) {
    next(err)
  }
}

export const getUserPosts = async (req, res, next) => {
  try {
    const id = Number(req.user.id)
    const posts = await getAuthorPosts(id)

    if (!posts) {
      return next(createApiError(404, 'Could not find posts'))
    }
    res.status(200).json(posts)
  } catch (err) {
    next(err)
  }
}

export const updatePostContent = async (req, res, next) => {
  try {
    const postId = Number(req.params.id)
    const userId = Number(req.user.id)
    const { content } = req.body

    if (!content) {
      return next(createApiError(400, 'Content is required'))
    }

    const post = await getPostById(postId)
    if (!post) {
      return next(createApiError(404, 'Post not found'))
    }

    const author = await getPostAuthor(postId)
    if (author.authorId !== userId) {
      return next(createApiError(403, 'You are not authorized to edit this post'))
    }

    const updatedPost = await updatePostContentById(postId, content)
    res.status(200).json(updatedPost)
  } catch (err) {
    next(err)
  }
}
