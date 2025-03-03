const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    order_number: {
      type: String,
      unique: true
    },
    user_id: {
      type: String,
      require: true
    },
    products: [{
      link: {
        type: String,
        require: true
      },
      title: {
        type: String,
        require: true
      },
      weight: {
        type: Number
      },
      size: {
        type: String
      },
      quantity: {
        type: Number,
        require: true
      },
      color: {
        type: String
      },
      comments: {
        type: String,
        trim: true
      }
    }],
    address_id: {
      type: Schema.Types.ObjectId,
      ref: 'address'
    }
  },
  {
    timestamps: {
      created_at: "created_at",
      updated_at: "updated_at",
    },
  }
);

orderSchema.pre('save', async function (next) {
  if (this.isNew) {
    const timestamp = Date.now();
    const randomPart = Math.floor(Math.random() * 1000);

    this.order_number = `ORD-${timestamp}-${randomPart}`;
  }
  next();
});

const order = mongoose.model("order", orderSchema);

module.exports = { order };
