import jwt from 'jsonwebtoken'
import { getUserByEmail, createUser } from '../services/userService.js'
import bcrypt from 'bcryptjs'
import { createApiError } from '../middleware/errorHandler.js'

const createJWT = (user) => {
  const payload = { id: user.id, email: user.email }
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '7d',
  })

  return token
}

export const login = async (req, res, next) => {
  const { email, password } = req.body

  try {
    const user = await getUserByEmail(email)

    if (!user) {
      return next(createApiError(401, 'Invalid email'))
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return next(createApiError(401, 'Invalid password'))
    }

    const token = createJWT(user)

    return res.status(200).json({ token, message: 'Login success' })
  } catch (err) {
    console.error(`[${email}] Login controller error:`, err)
    next(err)
  }
}

export const signup = async (req, res, next) => {
  const { firstName, lastName, email } = req.body
  const hashedPassword = await bcrypt.hash(req.body.password, 10)

  const userData = {
    firstName,
    lastName,
    email,
    password: hashedPassword,
  }

  try {
    const user = await createUser(userData)

    const token = createJWT(user)
    res.status(201).json({ token, message: 'Sign up success' })
  } catch (err) {
    console.error(err)

    if (err.code === 'P2002') {
      return next(createApiError(400, 'Email already in use'))
    }

    next(err)
  }
}

export const getUser = (req, res, next) => {
  if (!req.user) {
    return next(createApiError(404, 'No user found'))
  }
  const { id, firstName, lastName, email, admin } = req.user
  res.json({ id, firstName, lastName, email, admin })
}

export const admin = (req, res) => {
  let admin = false
  if (req.user) {
    admin = req.user.admin
  }
  res.json(admin)
}
