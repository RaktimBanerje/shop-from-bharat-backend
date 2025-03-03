const { razorpay } = require("../models/razorpay");

const addPayment = async (user, order_id, payment_id, amount, status) => {
    try {

        const result = await new razorpay({
            user_id: user.id,
            order_id,
            payment_id,
            amount,
            status
        }).save();

        return result
    }
    catch(error) {
        throw new Error(error.message || error)
    }
}

const getPayments = async (user) => {
    try {

        const result = await razorpay.find({ user_id: user.id });

        return result
    }
    catch(error) {
        throw new Error(error.message || error)
    }
}

const getPaymentById = async (razorpay_id) => {
    try {

        const result = await razorpay.findById({ _id: razorpay_id });

        if (!result) {
            throw new Error(`Payment Not Found`)
        }

        return result
    }
    catch(error) {
        throw new Error(error.message || error)
    }
}

const updatePayment = async (razorpay_id, body) => {
    try {

        const result = await razorpay.findByIdAndUpdate(
            razorpay_id,
            { $set: body },
            { new: true, runValidators: true }
        );

        if (!result) {
            throw new Error(`Payment Not Found`)
        }

        return result
    }
    catch(error) {
        throw new Error(error.message || error)
    }
}

module.exports = {
    addPayment,
    getPayments,
    getPaymentById,
    updatePayment
}