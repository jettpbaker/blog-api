import passport from '../config/passport.js'

export const isAuthed = passport.authenticate('jwt', { session: false })

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.admin) {
    return next()
  }
  return res.status(403).json({ message: 'Forbidden: Admins only' })
}
