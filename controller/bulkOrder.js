const { bulkOrder } = require("../models/bulkOrder");

const createBulkOrder = async ( name, contact_number, category, country, quantity, category_description ) => {
    try {

        const result = await new bulkOrder({
            name,
            contact_number,
            category,
            country,
            quantity,
            category_description
        }).save();

        return result
    }
    catch(error) {
        throw new Error(error.message || error)
    }
}

const getOrders = async () => {
    try {

        const result = await bulkOrder.find({});

        return result
    }
    catch(error) {
        throw new Error(error.message || error)
    }
}

const getOrderById = async (order_id) => {
    try {

        const result = await bulkOrder.findById({ _id: order_id });

        if (!result) {
            throw new Error(`Order Not Found`)
        }

        return result
    }
    catch(error) {
        throw new Error(error.message || error)
    }
}

module.exports = {
    createBulkOrder,
    getOrders,
    getOrderById
}