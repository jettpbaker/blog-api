import Router from 'express'
import * as posts from '../controllers/postsController.js'
import { isAuthed, isAdmin } from '../middleware/authMiddleware.js'

const router = Router()

router.get('/', posts.getPosts)
router.get('/:id', posts.getPost)

router.post('/', isAuthed, isAdmin, posts.createPost)

router.delete('/:id', isAuthed, isAdmin, posts.deletePost)

router.put('/:id', isAuthed, isAdmin, posts.updatePost)

export default router
