const express = require("express");
const router = express.Router();
const controller = require("../controller/user");

router.get("/:id", async(req, res) => {
    try {
        const { id } = req.params;

        const user = await controller.getUser(id);
        console.log("user is here",user)

        return res.send({ status: true, user });
    }
    catch (error) {
        return res.send({ status: false, message: error.message || error });
    }
})

router.post("/:id", async(req, res) => {
    try {
        const { id } = req.params;

        const body = req.body;

        if (!Object.keys(body).length) {
            throw new Error('invalid request body')
        }

        const { name, contact_number } = body;

        await controller.updateUser(id, name, contact_number);

        return res.send({ status: true, message: 'User updated successfully' });
    }
    catch (error) {
        return res.send({ status: false, message: error.message || error });
    }
})

module.exports = router
