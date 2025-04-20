import Router from 'express'
import * as posts from '../controllers/postsController.js'
import * as comments from '../controllers/commentsController.js'
import * as ai from '../controllers/aiController.js'
import { isAuthed, isAdmin } from '../middleware/authMiddleware.js'

const router = Router()

// Post endpoints
router.get('/', posts.getPosts)
router.get('/user-posts', isAuthed, posts.getUserPosts)
router.get('/:id', posts.getPost)

router.post('/', isAuthed, posts.createPost)

router.delete('/:id', isAuthed, posts.deletePost)

router.put('/:id', isAuthed, isAdmin, posts.togglePublishPost)
router.put('/:id/content', isAuthed, posts.updatePostContent)

// AI generation
router.post('/generate-description', isAuthed, ai.generateDescription)

// Comments endpoints
router.get('/:postId/comments', comments.getComments)
router.post('/:postId/comments', isAuthed, comments.newComment)
router.delete('/:postId/comments/:commentId', isAuthed, comments.deleteComment)

export default router
