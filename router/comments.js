import Router from 'express'
import * as comment from '../controllers/commentsController.js'
import { isAuthed } from '../middleware/authMiddleware.js'

const router = Router()

router.post('/', isAuthed, comment.newComment)

router.delete('/:id', isAuthed, comment.deleteComment)

export default router
