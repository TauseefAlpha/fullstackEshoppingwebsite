const jwt = require("jsonwebtoken")
require("dotenv").config()
const gAuthToken = (user) => {
    const secretkey = process.env.JWT_SEC_KEY;

    const jwttokn = jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    }, secretkey, { expiresIn: "10d" })
    // console.log("jwttokn generted",jwttokn)
    return jwttokn;
}

const middleware = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (authorization) {
        console.log("your miidleware Authorization token", authorization)
        const token = authorization.slice(7, authorization.length);//slice extrapart
        // const token1=authorization
        jwt.verify(
            token,
            process.env.JWT_SEC_KEY,
            (error, decode) => {
                if (error) {
                    res.status(401).send({ message: "your token is not valid" })
                }
                else {
                    req.user = decode
                    next();
                }

            }
        )
    }
    else {
        res.status(401).send({ message: "no token" })
    }

}

module.exports = { gAuthToken, middleware }
// module.exports = gAuthToken;
// module.exports = middleware;
