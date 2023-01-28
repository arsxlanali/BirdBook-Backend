const Advertisement = require("../model/Advertisement");

const getAllAdvertisements = async (req, res) => {
  const Advertisements = await Advertisement.find({ __v: 0 });
  if (!Advertisement)
    return res.status(204).json({ message: "No Advertisement found!" });
  res.json(Advertisements);
};

const createNewAdvertisement = async (req, res) => {
  if (
    !req?.body?.name ||
    !req?.body?.details ||
    !req?.body?.color ||
    !req?.body?.city ||
    !req?.body?.gender ||
    !req?.body?.age ||
    !req?.body?.ecologicalFactor ||
    !req?.body?.price ||
    !req?.body?.phone ||
    !req?.body?.image
  ) {
    return res.status(400).json({ message: "You need to fill all the fileds" });
  }

  try {
    const result = await Advertisement.create({
      name: req?.body?.name,
      details: req?.body?.details,
      color: req?.body?.color,
      city: req?.body?.city,
      gender: req?.body?.gender,
      age: req?.body?.age,
      ecologicalFactor: req?.body?.ecologicalFactor,
      price: req?.body?.price,
      phone: req?.body?.phone,
      image: req?.body?.image,
    });

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};

const deleteAdvertisement = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "Advertisement ID required." });

  const Advertisement = await Advertisement.findOne({
    _id: req.body.id,
  }).exec();
  if (!Advertisement) {
    return res
      .status(204)
      .json({ message: `No Advertisement matches ID ${req.body.id}.` });
  }
  const result = await Advertisement.deleteOne(); //{ _id: req.body.id }
  res.json(result);
};

const getAdvertisement = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Advertisement ID required." });

  const Advertisement = await Advertisement.findOne({
    _id: req.params.id,
  }).exec();
  if (!Advertisement) {
    return res
      .status(204)
      .json({ message: `No Advertisement matches ID ${req.params.id}.` });
  }
  res.json(Advertisement);
};

module.exports = {
  getAllAdvertisements,
  createNewAdvertisement,
  deleteAdvertisement,
  getAdvertisement,
};
