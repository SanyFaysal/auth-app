const jwt = require('jsonwebtoken')
const { config } = require('../../config')

exports.verifyToken = (req, res, next) => {
    try {

        const token = req.headers.authorization?.split(" ")[1]
        if (!token) {
            return res.status(404).json({
                success: false,
                message: 'Token not found'
            })
        }

        const decoded = jwt.verify(token, config.secret)

        if (!decoded) {
            return res.status(404).json({
                success: false,
                message: 'Token is not valid'
            })
        }

        req.user = {
            email: decoded.email,
            role: decoded.role
        }

        next()


    } catch (error) {

    }
}