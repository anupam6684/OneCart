import contactModel from "../models/contactModel.js";

// Save "Send Us" form
const createContactMessage = async (req, res) => {
  try {
    const { name, email, mobile, subject, message } = req.body;

    // Validate fields
    if (!name || !email || !mobile || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Save message
    const contact = await contactModel.create({
      name,
      email,
      mobile,
      subject,
      message,
    });

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      contact,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin: Get all contact messages
const getAllContactMessages = async (req, res) => {
  try {
    const contacts = await contactModel.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: contacts.length,
      contacts,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Mark as Read / Unread

const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await contactModel.findById(id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found",
      });
    }

    contact.status = contact.status === "Unread" ? "Read" : "Unread";

    await contact.save();

    res.status(200).json({
      success: true,
      message: "Contact status updated successfully",
      contact,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// Delete message

const deleteContactMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await contactModel.findByIdAndDelete(id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact message deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export {
  createContactMessage,
  getAllContactMessages,
  updateContactStatus,
  deleteContactMessage,
};
