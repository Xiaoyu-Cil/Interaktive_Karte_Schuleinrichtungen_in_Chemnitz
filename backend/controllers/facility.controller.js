const Facility = require("../models/facility.model");

exports.all_facility = async (req, res) => {
  try {
    const facility = await Facility.find({});
    res.status(200).send(facility);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.get_facility_by_category = async (req, res) => {
  const category = req.params.category;
  
  try {
    const facility = await Facility.find({ KATEGORIE: category });
    res.status(200).send(facility);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.get_facility_by_id = async (req, res) => {
  try {
    const facility = await Facility.findById(req.params.id);
    if (facility == null) {
      return res.status(404).json({ message: 'Cannot find facility' });
    }
    res.json(facility);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.get_facility_by_art = async (req, res) => {
  const artType = req.params.artType;
  try {
    const facilities = await Facility.find({ ART: { $exists: true, $ne: null, $eq: artType } });
    res.status(200).send(facilities);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};