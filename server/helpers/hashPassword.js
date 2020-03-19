function hashPassword(password) {
    const bcrypt = require('bcrypt');
    const saltRounds = 8
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash
}

module.exports = hashPassword
