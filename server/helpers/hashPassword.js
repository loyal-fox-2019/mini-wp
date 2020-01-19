const bcrypt = require("bcrypt");

module.exports = (plainPassword, saltRounds) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(plainPassword, salt);

  return hash;
};