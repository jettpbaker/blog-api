import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { getUserById } from '../services/userService.js'

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
}

const strategy = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await getUserById(payload.id)
    if (user) {
      return done(null, user)
    } else {
      return done(null, false)
    }
  } catch (error) {
    return done(error, false)
  }
})

passport.use(strategy)

export default passport
