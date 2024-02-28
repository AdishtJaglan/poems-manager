const express = require("express");
const router = express.Router();
const { verifyAccessToken } = require("../middleware");
const { createUser, loginUser, userDetails } = require("../controller/userController");


//@desc register a user 
//@route POST /auth/register/
//@access no authentication
router.post("/register/", createUser);

//@desc Login a user
//@route POST /auth/login/
//@access No authentication
router.post("/login/", loginUser);

//@desc Getting user details
//@route GET /auth/user-details/
//@access Authentication required
router.get("/user-details/", verifyAccessToken, userDetails);

module.exports = router;