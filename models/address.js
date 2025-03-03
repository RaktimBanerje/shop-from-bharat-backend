const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema = new Schema(
  {
    user_id: {
      type: String,
      require: true
    },
    name: {
      type: String,
      require: true
    },
    contact_number: {
      type: String,
      require: true
    },
    email: {
      type: String,
      require: true
    },
    address: {
      type: String,
    },
    zip_code: {
      type: Number,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    address_type: {
      type: String,
    },
    status: {
      type: String,
      default: 1
    }
  },
  {
    timestamps: {
      created_at: "created_at",
      updated_at: "updated_at",
    },
  }
);

const address = mongoose.model("address", addressSchema);

module.exports = { address };
