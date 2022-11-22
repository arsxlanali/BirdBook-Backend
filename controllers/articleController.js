const Article = require("../model/Article");

const getAllArticles = async (req, res) => {
  if (!req?.body?.title) {
    return res.status(400).json({ message: "title is required in the body!." });
  }
  const articles = await Article.find({ title: req.body.title }, { __v: 0 });
  if (!Article) return res.status(204).json({ message: "No article found!" });
  res.json(articles);
};

const createNewArticle = async (req, res) => {
  if (
    !req?.body?.title ||
    !req?.body?.published ||
    !req?.body?.author ||
    !req?.body?.text ||
    !req?.body?.image
  ) {
    return res
      .status(400)
      .json({ message: "title , published and answers fileds are required!" });
  }

  try {
    const result = await Article.create({
      title: req.body.title,
      published: req.body.published,
      author: req.body.author,
      text: req.body.text,
      image: req.body.image,
    });

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};

const deleteQuestion = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "Article ID required." });

  const Article = await Article.findOne({ _id: req.body.id }).exec();
  if (!Article) {
    return res
      .status(204)
      .json({ message: `No Article matches ID ${req.body.id}.` });
  }
  const result = await Article.deleteOne(); //{ _id: req.body.id }
  res.json(result);
};

const getQuestion = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Article ID required." });

  const Article = await Article.findOne({ _id: req.params.id }).exec();
  if (!Article) {
    return res
      .status(204)
      .json({ message: `No Article matches ID ${req.params.id}.` });
  }
  res.json(Article);
};

module.exports = {
  getAllArticles,
  createNewArticle,
  deleteQuestion,
  getQuestion,
};
