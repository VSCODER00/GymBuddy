const userAttributesDB = require("../models/userAttributes.model");

const setUserAttributes = async (req, res) => {
  const userId = req.user;
  try {
    const { goals, experience, availability } = req.body;
    if (!(goals && experience && availability)) {
      return res.status(500).json({ message: "All the fields are required" });
    }
    const newDetails = new userAttributesDB({
      userId: userId,
      goals: goals,
      experience: experience,
      availability: availability,
    });
    await newDetails.save();
    return res
      .status(200)
      .json({ message: "User details stored successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const updateUserAttributes = async (req, res) => {
  const userId = req.user;
  try {
    const { Newgoals, Newexperience, Newavailability } = req.body;
    if (!(Newgoals && Newexperience && Newavailability)) {
      return res.status(500).json({ message: "All the fields are required" });
    }
    await userAttributesDB.updateOne(
      { userId: userId },
      {
        goals: Newgoals,
        experience: Newexperience,
        availability: Newavailability,
      },
    );
    return res
      .status(200)
      .json({ message: "User details updated successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const getUserAttributes = async (req, res) => {
  const userId = req.user;
  const results = await userAttributesDB.findOne({ userId: userId });
  res.send(results);
};

module.exports = { getUserAttributes, setUserAttributes, updateUserAttributes };
