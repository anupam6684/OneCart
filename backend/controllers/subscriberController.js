import subscriberModel from "../models/subscriberModel.js";

export const createSubscriber = async (req, res) => {
  try {
    const { email } = req.body;

    const existing = await subscriberModel.findOne({ email });

    if (existing) {
      return res.json({
        success: false,
        message: "Email already subscribed",
      });
    }

    const subscriber = await subscriberModel.create({ email });

    res.json({
      success: true,
      message: "Subscribed successfully",
      subscriber,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await subscriberModel.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      subscribers,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteSubscriber = async (req, res) => {
  try {
    const { id } = req.params;

    await subscriberModel.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Subscriber deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
