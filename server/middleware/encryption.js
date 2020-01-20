const bcrypt = require('bcrypt')
const saltRounds = 4

function hash(password) {
    let hashedPassword = bcrypt.hashSync(password, saltRounds)
    return hashedPassword
}

module.exports = hash