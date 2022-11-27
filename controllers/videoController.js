const Video = require("../model/Video");

const getAllVideos = async (req, res) => {
  const Videos = await Video.find({ __v: 0 });
  if (!Videos) return res.status(204).json({ message: "No Video found!" });
  res.json(Videos);
};

const addNewVideo = async (req, res) => {
  if (!req?.body?.title || !req?.body?.link) {
    return res.status(400).json({ message: "Video and Title should be added" });
  }

  try {
    const result = await Video.create({
      link: req.body.link,
      title: req.body.title,
    });

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};

const deleteVideo = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "Video ID required." });

  const Video = await Video.findOne({ _id: req.body.id }).exec();
  if (!Video) {
    return res
      .status(204)
      .json({ message: `No Video matches ID ${req.body.id}.` });
  }
  const result = await Video.deleteOne(); //{ _id: req.body.id }
  res.json(result);
};

module.exports = {
  getAllVideos,
  addNewVideo,
  deleteVideo,
};
