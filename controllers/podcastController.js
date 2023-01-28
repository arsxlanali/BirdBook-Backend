const Podcast = require("../model/Podcast");

const getAllPodcasts = async (req, res) => {
  const Podcasts = await Podcast.find({ __v: 0 });
  if (!Podcast) return res.status(204).json({ message: "No Podcast found!" });
  res.json(Podcasts);
};

const createNewPodcast = async (req, res) => {
  if (
    !req?.body?.title ||
    !req?.body?.name ||
    !req?.body?.link ||
    !req?.body?.image ||
    !req?.body?.date
  ) {
    return res.status(400).json({ message: "You need to fill all the fileds" });
  }

  try {
    const result = await Podcast.create({
      title: req.body.title,
      name: req.body.name,
      link: req.body.link,
      image: req.body.image,
      date: req.body.date,
    });

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};

const deletePodcast = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "Podcast ID required." });

  const Podcast = await Podcast.findOne({ _id: req.body.id }).exec();
  if (!Podcast) {
    return res
      .status(204)
      .json({ message: `No Podcast matches ID ${req.body.id}.` });
  }
  const result = await Podcast.deleteOne(); //{ _id: req.body.id }
  res.json(result);
};

const getPodcast = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Podcast ID required." });

  const Podcast = await Podcast.findOne({ _id: req.params.id }).exec();
  if (!Podcast) {
    return res
      .status(204)
      .json({ message: `No Podcast matches ID ${req.params.id}.` });
  }
  res.json(Podcast);
};

module.exports = {
  getAllPodcasts,
  createNewPodcast,
  deletePodcast,
  getPodcast,
};
