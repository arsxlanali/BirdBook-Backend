const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticlesSchema = new Schema({
  title: { type: String },
  image: { type: String },
  name: { type: String },
  title: { type: String },
  date: { type: String },
});

module.exports = mongoose.model("Podcast", ArticlesSchema);
