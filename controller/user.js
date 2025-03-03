const {user} = require("../models/user")

const getUser = async (userId) => {
    try {

        const result = await user.findById({ _id: userId }, { password: 0 });

        if (!result) {
            throw new Error(`User Not Found`)
        }

        return result
    }
    catch(error) {
        throw new Error(error.message || error)
    }
}

const updateUser = async (userId, name, contact_number) => {
    try {

        const updateData = {};

        if (name) {
            updateData.name = name
        }

        if (contact_number) {
            updateData.contact_number = contact_number
        }

        const result = await user.findByIdAndUpdate(userId, updateData, {
            new: true,
            runValidators: true
        })

        if (!result) {
            throw new Error("User not found");
        }

        return true
    }
    catch(error) {
        throw new Error(error.message || error)
    }
}

module.exports = {
    getUser,
    updateUser
}