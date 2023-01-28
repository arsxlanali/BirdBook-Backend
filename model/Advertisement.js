const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdvertisemenntSchema = new Schema({
  name: { type: String },
  details: { type: String },
  color: { type: String },
  city: { type: String },
  gender: { type: String },
  age: { type: Number },
  ecologicalFactor: { type: String },
  price: { type: Number },
  phone: { type: String },
  image: { type: String },
});

module.exports = mongoose.model("Advertisemennt", AdvertisemenntSchema);
