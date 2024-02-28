const jwt = require("jsonwebtoken");
const secretKey = "averystrongsecretkey";

//middleware to verify access token
module.exports.verifyAccessToken = (req, res, next) => {
    const authorizationHeader = req.headers["authorization"];

    if (!authorizationHeader) {
        return res.status(401).json({ message: "Access token missing" });
    }

    const token = authorizationHeader.split(' ')[1];

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid access token' });
        }

        req.user = decoded;
        next();
    });
}