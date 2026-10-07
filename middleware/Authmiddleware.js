const jwt = require('jsonwebtoken')

const AuthMiddleWare = (req, res, next) => {
  try {
    const AuthHeader = req.headers.authorization

    if (!AuthHeader || !AuthHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        message: 'Token required',
      })
    }

    const token = AuthHeader.split(' ')[1]

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    )

    req.user = decoded

    next()
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid or expired token',
    })
  }
}

module.exports = AuthMiddleWare