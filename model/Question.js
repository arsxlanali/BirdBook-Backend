const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  text: { type: String },
  type: { type: String },
  answers: [
    {
      text: {
        type: String,
        required: true,
      },
      correct: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
  ],
});

module.exports = mongoose.model("Question", QuestionSchema);
