import Router from 'express'
import * as posts from '../controllers/postsController.js'
import { isAuthed, isAdmin } from '../middleware/authMiddleware.js'

const router = Router()

router.get('/', posts.getPosts)
router.get('/user-posts', isAuthed, posts.getUserPosts)
router.get('/:id', posts.getPost)

router.post('/', isAuthed, posts.createPost)

router.delete('/:id', isAuthed, posts.deletePost)

router.put('/:id', isAuthed, isAdmin, posts.togglePublishPost)
router.put('/:id/content', isAuthed, posts.updatePostContent)

export default router
