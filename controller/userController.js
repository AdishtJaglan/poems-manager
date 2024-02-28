const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const secretKey = "averystrongsecretkey";

//@desc register a user 
//@route POST /auth/register/
//@access no authentication
module.exports.createUser = async (req, res) => {
    const { name, email, password } = req.body;

    //checking if user leaves any field empty
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("All fields mandatory.");
    }

    const availableUser = await User.findOne({ email });

    //checking if user exists
    if (availableUser) {
        res.status(400);
        throw new Error("User already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        name,
        email,
        password: hashedPassword,
    });
    await user.save();

    console.log("Created user: ", user);

    if (user) {
        return res.status(201).json({ message: "User registered successfully" });
    } else {
        return res.status(400).json({ message: "User data is invalid." });
    }
}

//@desc Login a user
//@route POST /auth/login/
//@access No authentication
module.exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);

        if (!passwordCompare) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        const accessToken = jwt.sign({
            _id: user._id,
            email: user.email,
            name: user.name,
            poems: user.poems || [],
        },
            secretKey,
            { expiresIn: "15m" },
        );

        const refreshToken = jwt.sign({
            _id: user._id,
            email: user.email,
            name: user.name,
            poems: user.poems || [],
        },
            secretKey,
            { expiresIn: "7d" },
        );

        res.json({ access: accessToken, refresh: refreshToken });
    } catch (err) {
        console.log("Error during login,", err);
        res.status(500).json({ message: "Internal server error." });
    }
}

//@desc Getting user details
//@route GET /auth/user-details/
//@access Authentication required
module.exports.userDetails = async (req, res) => {
    const { _id, name, email } = req.user;

    res.json({ email, name, _id });
}