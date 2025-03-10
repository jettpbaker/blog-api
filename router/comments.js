import Router from 'express'
import * as comment from '../controllers/commentsController.js'

const router = Router()

router.post('/', comment.newComment)

router.delete('/:id', comment.deleteComment)

export default router
