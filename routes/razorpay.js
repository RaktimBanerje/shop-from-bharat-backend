const express = require("express");
const router = express.Router();
const controller = require("../controller/razorpay");

router.post("/create", async(req, res) => {
    try {
        const body = req.body;

        if (!Object.keys(body).length) {
            throw new Error('invalid request body')
        }

        const { order_id, payment_id, amount, status } = body;

        const result = await controller.addPayment(req.user, order_id, payment_id, amount, status);

        return res.send({ status: true, message: "payment created successfully", payment: result });
    }
    catch (error) {
        return res.send({ status: false, message: error.message || error });
    }
})

router.get("/list", async(req, res) => {
    try {

        const payments = await controller.getPayments(req.user);

        return res.send({ status: true, payments });
    }
    catch (error) {
        return res.send({ status: false, message: error.message || error });
    }
})

router.get("/:razorpay_id", async(req, res) => {
    try {

        const payment = await controller.getPaymentById(req.params.razorpay_id);

        return res.send({ status: true, payment });
    }
    catch (error) {
        return res.send({ status: false, message: error.message || error });
    }
})

router.post("/:razorpay_id", async(req, res) => {
    try {

        const body = req.body;

        if (!Object.keys(body).length) {
            throw new Error('invalid request body')
        }

        const payment = await controller.updatePayment(req.params.razorpay_id, body);

        return res.send({ status: true, payment });
    }
    catch (error) {
        return res.send({ status: false, message: error.message || error });
    }
})

module.exports = router
