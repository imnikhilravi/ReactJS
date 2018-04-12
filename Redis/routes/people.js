const express = require('express');
const userInfo = require("../data/users");
const cached = require("../data/cached");

const router = express.Router();

router.get("/history", async (req, res) => {
    try {
        let data = await cached.getCacheUsers();
        res.json(data);
    }
    catch (error) {
        res.status(404).json(error);
    }
});

router.get("/:id", async (req, res) => {
    try {
        let data = await userInfo.getUserById(req.params.id);
        res.json(data);
    }
    catch (error) {
        res.status(404).json(error);
    }
});

module.exports = router;