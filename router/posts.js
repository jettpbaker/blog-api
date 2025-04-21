import Router from 'express'
import * as posts from '../controllers/postsController.js'
import * as comments from '../controllers/commentsController.js'
import * as ai from '../controllers/aiController.js'
import { isAuthed, isAdmin } from '../middleware/authMiddleware.js'

const router = Router()

// Post endpoints
router.get('/', posts.getPosts)
router.get('/:id', posts.getPost)
router.post('/', isAuthed, posts.createPost)
router.patch('/:id', isAuthed, posts.updatePostContent)
router.delete('/:id', isAuthed, posts.deletePost)
router.patch('/:id/publish', isAuthed, isAdmin, posts.togglePublishPost)

// AI generation
router.post('/generate-description', isAuthed, ai.generateDescription)

// Comments endpoints
router.post('/:postId/comments', isAuthed, comments.newComment)
router.delete('/comments/:commentId', isAuthed, comments.deleteComment)

export default router
