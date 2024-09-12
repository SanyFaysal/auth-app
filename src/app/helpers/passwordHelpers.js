
const bcrypt = require('bcryptjs')

exports.hashPassword = (password) => {
    return bcrypt.hashSync(password, 8)
}


exports.checkPassword = (password, hash) => {
    return bcrypt.compareSync(password, hash)
}