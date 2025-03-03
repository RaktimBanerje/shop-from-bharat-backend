const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bulkOrderSchema = new Schema(
  {
    name: {
      type: String,
      require: true
    },
    contact_number: {
      type: String,
      require: true
    },
    category: {
      type: String,
      require: true
    },
    country: {
      type: String,
      require: true
    },
    quantity: {
      type: Number
    },
    category_description: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: {
      created_at: "created_at",
      updated_at: "updated_at",
    },
  }
);

const bulkOrder = mongoose.model("bulkOrder", bulkOrderSchema);

module.exports = { bulkOrder };
