const jwt = require('jsonwebtoken');

const authorize = (req, res, next) => {
    try {
    const token = req.cookies.token;
    
    if(!token){
        res.status(401).json({message: "Unauthorised"});
    }

    const verified = jwt.verify(token, process.env.SECRET);
    req.userId = verified._id;

    next();
    } catch (e) {
        res.status(400).json({error: "Authorization failed"});
    }
}


module.exports = authorize;