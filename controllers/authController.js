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
  console.log(`[${new Date().toISOString()}] Login attempt started for: ${req.body.email}`) // Log start with timestamp
  console.time(`[${req.body.email}] login-controller-total`) // Start total timer, identify by email

  const { email, password } = req.body

  try {
    console.time(`[${email}] login-getUserByEmail`)
    const user = await getUserByEmail(email)
    console.timeEnd(`[${email}] login-getUserByEmail`)

    if (!user) {
      console.log(`[${email}] Login attempt failed: Invalid email`)
      console.timeEnd(`[${email}] login-controller-total`) // End total timer early
      return res.status(401).json({ message: 'Invalid email' })
    }

    console.time(`[${email}] login-bcryptCompare`)
    const isMatch = await bcrypt.compare(password, user.password)
    console.timeEnd(`[${email}] login-bcryptCompare`)

    if (!isMatch) {
      console.log(`[${email}] Login attempt failed: Invalid password`)
      console.timeEnd(`[${email}] login-controller-total`) // End total timer early
      return res.status(401).json({ message: 'Invalid password' })
    }

    console.time(`[${email}] login-createJWT`)
    const token = createJWT(user)
    console.timeEnd(`[${email}] login-createJWT`)

    console.log(`[${email}] Login successful`)
    console.timeEnd(`[${email}] login-controller-total`) // End total timer on success
    return res.status(200).json({ token, message: 'Login success' })
  } catch (err) {
    console.error(`[${email}] Login controller error:`, err) // Log the actual error
    console.timeEnd(`[${email}] login-controller-total`) // End total timer on error
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
