const express = require("express");
const router = express.Router();
const { verifyAccessToken } = require("../middleware");
const { createPoem, getPoem } = require("../controller/poemController");

//@desc Creating a poem
//@route POST /poems/create/
//@access Authentication required
router.post("/create/", verifyAccessToken, createPoem);

//@desc Getting poems associated with a user
//@route GET /poems/get/
//@access Authentication required
router.get("/get/", verifyAccessToken, getPoem);

module.exports = router;
