import Router from 'express'
import * as auth from '../controllers/authController.js'
import * as posts from '../controllers/postsController.js'
import { isAuthed, isAdmin } from '../middleware/authMiddleware.js'

const router = Router()

// Auth endpoints
router.post('/login', auth.login)
router.post('/signup', auth.signup)

// User endpoints
router.get('/me', isAuthed, auth.getName)
router.get('/me/admin', isAuthed, auth.admin)
router.get('/me/posts', isAuthed, posts.getUserPosts)

export default router
