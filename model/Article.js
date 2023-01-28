const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticlesSchema = new Schema({
  title: { type: String },
  type: { type: String },
  published: { type: String },
  author: { type: String },
  text: { type: String },
  image: { type: String },
});

module.exports = mongoose.model("Article", ArticlesSchema);
