import Router from 'express'
import * as ai from '../controllers/aiController.js'

const router = Router()

router.post('/', ai.generateDescription)

export default router
