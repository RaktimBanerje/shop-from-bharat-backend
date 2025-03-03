const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    contact_number: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    is_address_exist: {
      type: Boolean,
      default: false
    },
    profile: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
    },
    device_token: {
      type: String,
    },
    status: {
      type: Number,
    },
    googel_id: {
      type: String,
    },
    google_profile: {
      type: String,
    },
    social_account: {
      type: Boolean,
    },
    other_info: {
      type: String
    },
    is_admin: {
      type: Boolean
    }
  },
  {
    timestamps: {
      created_at: "created_at",
      updated_at: "updated_at",
    },
  }
);

const user = mongoose.model("user", userSchema);

module.exports = { user };
