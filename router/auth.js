import Router from 'express'
import * as auth from '../controllers/authController.js'
import { isAuthed } from '../middleware/authMiddleware.js'

const router = Router()

router.post('/signup', auth.signup)
router.post('/login', auth.login)
router.get('/user', isAuthed, auth.getName)
router.get('/admin', isAuthed, auth.admin)

export default router
