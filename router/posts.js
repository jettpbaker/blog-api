import Router from 'express'
import * as posts from '../controllers/postsController.js'

const router = Router()

router.get('/', posts.getPosts)
router.get('/:id', posts.getPost)

router.post('/', posts.createPost)

router.delete('/:id', posts.deletePost)

router.put('/:id', posts.updatePost)

export default router
