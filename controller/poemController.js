const Poem = require("../models/poem");

//@desc Creating a poem
//@route POST /poems/create/
//@access Authentication required
module.exports.createPoem = async (req, res) => {
    try {
        const newPoem = new Poem(req.body);
        newPoem.user = req.user._id;

        req.user.poems.push(newPoem);

        await newPoem.save();

        res.status(201).json({ message: "Poem created successfully", poem: newPoem });
    } catch (err) {
        console.log("Error in creating poem.", err);
        res.status(500).json({ message: "Internal server error" });
    }
}

//@desc Getting poems associated with a user
//@route GET /poems/get/
//@access Authentication required
module.exports.getPoem = async (req, res) => {
    try {
        const poems = await Poem.find({ user: req.user._id });

        res.json({ poems });
    } catch (error) {
        console.error("Error getting poems:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}