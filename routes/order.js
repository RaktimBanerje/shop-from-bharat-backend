const express = require("express");
const router = express.Router();
const controller = require("../controller/order");

router.post("/create", async(req, res) => {
    try {
        const body = req.body;

        if (!Object.keys(body).length) {
            throw new Error('invalid request body')
        }

        const { products, address_id } = body;

        const order = await controller.createOrder(req.user, products, address_id);

        return res.send({ status: true, message: 'order created successfully', order });
    }
    catch (error) {
        return res.send({ status: false, message: error.message || error });
    }
})

router.get("/list", async(req, res) => {
    try {

        const orders = await controller.getOrders(req.user);

        return res.send({ status: true, orders });
    }
    catch (error) {
        return res.send({ status: false, message: error.message || error });
    }
})

router.get("/:order_id", async(req, res) => {
    try {

        const order = await controller.getOrderById(req.params.order_id);

        return res.send({ status: true, order });
    }
    catch (error) {
        return res.send({ status: false, message: error.message || error });
    }
})

module.exports = router
