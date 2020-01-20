const bcrypt = require('bcrypt')

function cocokPass(passMasuk, passDB) {
    let match = bcrypt.compareSync(passMasuk, passDB)
    return match
}

module.exports = cocokPass