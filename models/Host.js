const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hostSchema = new Schema(
  {
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    telephone: { type: Number, required: true },
    address: { type: String, required: true },
    cite: { type: String, required: true },
    zipCode: { type: Number, required: true },
    Criteria: {
      living: { type: String, enum: ["house", "Appart"] },
      Garder: { type: Boolean },
      language: { type: Array },
      Smoking: { type: Boolean },
      animals: { type: Boolean },
      capacity: { type: Number, min: 1, max: 5 }
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Host = mongoose.model("Host", hostSchema);
module.exports = User;
