import jwt from 'jsonwebtoken'
import { getUserByEmail, createUser } from '../services/userService.js'
import bcrypt from 'bcryptjs'

const createJWT = (user) => {
  const payload = { id: user.id, email: user.email }
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '24hr',
  })

  return token
}

export const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await getUserByEmail(email)

    if (!user) {
      return res.status(401).json({ message: 'Invalid email' })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' })
    }

    const token = createJWT(user)

    return res.status(200).json({ token, message: 'Login success' })
  } catch (err) {
    console.error(`[${email}] Login controller error:`, err)
    return res.status(500).json({ message: 'Server error' })
  }
}

export const signup = async (req, res) => {
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
      return res.status(400).json({ message: 'Email already in use' })
    }

    res.status(500).json({ message: 'Server error' })
  }
}

export const getName = (req, res) => {
  if (!req.user) {
    return res.status(404).json({ message: 'No user found' })
  }
  const { firstName, lastName } = req.user
  res.json({ firstName, lastName })
}

export const admin = (req, res) => {
  let admin = false
  if (req.user) {
    admin = req.user.admin
  }
  res.json(admin)
}
