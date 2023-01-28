const Question = require("../model/Question");

const getAllQuestions = async (req, res) => {
  console.log("this is prams", req.params, req.body);
  if (!req?.body?.type) {
    return res.status(400).json({ message: "Type is required in the body!." });
  }
  console.log("helo", req?.body?.type);
  const questions = await Question.find(
    { type: req.body.type },
    { type: 0, __v: 0 }
  );
  if (!Question) return res.status(204).json({ message: "No qestion found!" });
  res.json(questions);
};

const createNewQuestion = async (req, res) => {
  if (!req?.body?.text || !req?.body?.type || !req?.body?.answers) {
    return res
      .status(400)
      .json({ message: "Text , type and answers fileds are required!" });
  }

  try {
    const result = await Question.create({
      text: req.body.text,
      type: req.body.type,
      media: req.body.media,
      answers: req.body.answers,
    });

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};

const updateQuestion = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "ID parameter is required." });
  }

  const question = await Question.findOne({ _id: req.body.id }).exec();
  if (!question) {
    return res
      .status(204)
      .json({ message: `No question matches ID ${req.body.id}.` });
  }
  if (req.body?.text) question.text = req.body.text;
  if (req.body?.type) question.type = req.body.type;
  if (req.body?.media) question.media = req.body.media;
  if (req.body?.answers) question.answers = req.body.answers;
  const result = await question.save();
  res.json(result);
};

const deleteQuestion = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "Question ID required." });

  const question = await Question.findOne({ _id: req.body.id }).exec();
  if (!question) {
    return res
      .status(204)
      .json({ message: `No question matches ID ${req.body.id}.` });
  }
  const result = await question.deleteOne(); //{ _id: req.body.id }
  res.json(result);
};

const getQuestion = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Question ID required." });

  const question = await Question.findOne({ _id: req.params.id }).exec();
  if (!question) {
    return res
      .status(204)
      .json({ message: `No question matches ID ${req.params.id}.` });
  }
  res.json(question);
};

const getResult = async (req, res) => {
  if (!req?.body)
    return res.status(400).json({ message: "Json body is required." });

  const questionId = req?.body.map(({ id }) => id);
  const choiceId = req?.body.map(({ id1 }) => id1);
  // console.log("this", questionId);
  const question = await Question.find(
    { _id: { $in: questionId } },
    { answers: { $elemMatch: { correct: true } } },
    { text: 0, type: 0, __v: 0 }
  );
  if (!question) {
    return res
      .status(204)
      .json({ message: `No question matches ID ${req.params.id}.` });
  }
  console.log(
    "Result",
    question[0].answers[0]._id.toString() == req?.body?.id1,
    question.length
  );
  let score = 0;
  for (let i in question) {
    console.log(
      "thsshhshs",
      question[i].answers[0]._id.toString(),
      choiceId[i]
    );
    if (question[i].answers[0]._id.toString() == choiceId[i]) {
      score++;
    }
    console.log("thhsh", score);
  }

  res.json({ score: score, total: question.length });
};
module.exports = {
  getAllQuestions,
  createNewQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestion,
  getResult,
};
