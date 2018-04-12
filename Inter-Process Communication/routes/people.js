const express = require('express');
const router = express.Router();

const redisConnection = require('../redis-connection');

const layout = res => {
    redisConnection.on('layout', (user, channel) => {
        res.json(user);
    });
}

router.get("/:id", async (req, res) => {
    try {
        layout(res);
        redisConnection.emit('find-user', { userId: req.params.id });
    }
    catch (error) {
        res.status(404).json(error);
    }
});

router.post("/", async (req, res) => {
    try {
        layout(res);
        const user = {
            "id": req.body.id,
            "first_name": req.body.first_name,
            "last_name": req.body.last_name,
            "email": req.body.email,
            "gender": req.body.gender,
            "ip_address": req.body.ip_address
        };
        redisConnection.emit('add-user', user);
    }
    catch (error) {
        res.status(404).json(error);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        layout(res);
        redisConnection.emit('remove-user', { userId: req.params.id });
    }
    catch (error) {
        res.status(404).json(error);
    }
});

router.put("/:id", async (req, res) => {
    try {
        layout(res);
        const user = {
            "first_name": req.body.first_name,
            "last_name": req.body.last_name,
            "email": req.body.email,
            "gender": req.body.gender,
            "ip_address": req.body.ip_address
        };
        user.id = req.params.id;
        redisConnection.emit('update-user', user);
    }
    catch (error) {
        res.status(404).json(error);
    }
});

module.exports = router;