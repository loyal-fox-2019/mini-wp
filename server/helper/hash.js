const bcrypt = require('bcrypt')
const saltRounds = 5;

class Password{
    static hash (plaintext){
        return new Promise ((resolve, reject)=>{
            bcrypt.genSalt(saltRounds, function(err, salt) {
                bcrypt.hash(plaintext, salt, function(err, hash) {
                    resolve(hash)
                });
            });
        })
    }

    static compare(plaintext, hashed){
        return new Promise((resolve, reject)=>{
            bcrypt.compare(plaintext, hashed, (err, res)=>{
                resolve(res)
            })
        })
    }
}


module.exports = Password