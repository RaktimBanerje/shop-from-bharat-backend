const express = require("express");
const router = express.Router();
const controller = require("../controller/address");

router.post("/create", async(req, res) => {
    try {
        const body = req.body;

        if (!Object.keys(body).length) {
            throw new Error('invalid request body')
        }

        const { name, contact_number, email, address, zip_code, city, country, address_type } = body;

        const result = await controller.addAddress(req.user, name, contact_number, email, address, zip_code, city, country, address_type);

        return res.send({ status: true, message: "address saved successfully", address: result });
    }
    catch (error) {
        return res.send({ status: false, message: error.message || error });
    }
})

router.get("/list", async(req, res) => {
    try {

        const address = await controller.getAddress();

        return res.send({ status: true, address });
    }
    catch (error) {
        return res.send({ status: false, message: error.message || error });
    }
})

router.get("/:address_id", async(req, res) => {
    try {

        const address = await controller.getAddressById(req.params.address_id);

        return res.send({ status: true, address });
    }
    catch (error) {
        return res.send({ status: false, message: error.message || error });
    }
})

router.post("/:address_id", async(req, res) => {
    try {

        const body = req.body;

        if (!Object.keys(body).length) {
            throw new Error('invalid request body')
        }

        const address = await controller.updateAddress(req.params.address_id, body);

        return res.send({ status: true, address });
    }
    catch (error) {
        return res.send({ status: false, message: error.message || error });
    }
})

module.exports = router
