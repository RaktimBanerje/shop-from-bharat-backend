const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RazorpaySchema = new Schema(
  {
    user_id: {
      type: String,
      require: true
    },
    order_id: {
      type: String,
      require: true
    },
    payment_id: {
      type: String
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'INR'
    },
    status: {
      type: String,
      default: 'initiated'
    }
  },
  {
    timestamps: {
      created_at: "created_at",
      updated_at: "updated_at",
    },
  }
);

const razorpay = mongoose.model("razorpay", RazorpaySchema);

module.exports = { razorpay };
