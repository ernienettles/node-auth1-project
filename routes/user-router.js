const express = require("express");
const router = express.Router();

const Users = require("../models/user-model.js");

router.get("/", (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => res.send(err));
});

module.exports = router;