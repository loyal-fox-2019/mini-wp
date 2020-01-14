const jwt = require('jsonwebtoken');

const authenticationToken = (req, res, next) => {
    if (!req.headers.authorization) throw "You don't have the authorization to do this action !!!";

    let token = req.headers.authorization.split(" ")[1];

    req.token = jwt.verify(token, process.env.SECRET_KEY);
    next();
};

module.exports = {
    authenticationToken
};