const { address } = require("../models/address");

const addAddress = async (user, name, contact_number, email, address_line, zip_code, city, country, address_type) => {
    try {

        const result = await new address({
            user_id: user.id,
            name,
            contact_number,
            email,
            address: address_line,
            zip_code,
            city,
            country,
            address_type
        }).save();

        return result
    }
    catch(error) {
        throw new Error(error.message || error)
    }
}

const getAddress = async () => {
    try {

        const result = await address.find({ status: 1 });

        return result
    }
    catch(error) {
        throw new Error(error.message || error)
    }
}

const getAddressById = async (address_id) => {
    try {

        const result = await address.findById({ _id: address_id });

        if (!result) {
            throw new Error(`Address Not Found`)
        }

        return result
    }
    catch(error) {
        throw new Error(error.message || error)
    }
}

const updateAddress = async (address_id, body) => {
    try {

        const result = await address.findByIdAndUpdate(
            address_id,
            { $set: body },
            { new: true, runValidators: true }
        );

        if (!result) {
            throw new Error(`Address Not Found`)
        }

        return result
    }
    catch(error) {
        throw new Error(error.message || error)
    }
}

module.exports = {
    addAddress,
    getAddress,
    getAddressById,
    updateAddress
}