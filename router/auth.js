import Router from 'express'
import * as auth from '../controllers/authController.js'

const router = Router()

router.post('/signup', auth.signup)

router.post('/login', auth.login)

export default router
