const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VideoSchema = new Schema({
  link: { type: String },
  title: { type: String },
});

module.exports = mongoose.model("Video", VideoSchema);
