const { order } = require("../models/order");

const createOrder = async ( user, products, address_id ) => {
    try {

        const result = await new order({
            user_id: user.id,
            products,
            address_id
        }).save();

        return result
    }
    catch(error) {
        throw new Error(error.message || error)
    }
}

const getOrders = async (user) => {
    try {

        const result = await order.find({ user_id: user.id })
            .populate('address_id').lean().exec();

        result.map(i => {
            i.address = i.address_id;
            delete i.address_id
            return i
        })

        return result
    }
    catch(error) {
        throw new Error(error.message || error)
    }
}

const getOrderById = async (order_id) => {
    try {

        const result = await order.findById({ _id: order_id })
            .populate('address_id').lean().exec();

        if (!result) {
            throw new Error(`Order Not Found`)
        }

        result.address = result.address_id;
        delete result.address_id

        return result
    }
    catch(error) {
        throw new Error(error.message || error)
    }
}

module.exports = {
    createOrder,
    getOrders,
    getOrderById
}