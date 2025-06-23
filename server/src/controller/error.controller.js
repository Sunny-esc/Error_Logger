import express from "express";
import errorModel from "../models/error.model.js";
import { User } from "../models/user.model.js";
import authMiddleware from "../middleware/auth.middleware.js";
const Erouter = express.Router();

// save a new notes
Erouter.post("/add", authMiddleware, async (req, res) => {
  try {
    const { message,label,lang } = req.body;
    if (!message) {
      return res.status(409).json({ error: "Msg didn't findout" });
    }
    const newerror = new errorModel({ userId: req.userData.userId, message ,label,lang});
    const savederror = await newerror.save();
    res.status(201).json({
      message: "Error logged successfully",
      error: savederror,
    });
  } catch (err) {
    console.error(" error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// update an existing note
Erouter.put("/update/:id", authMiddleware, async (req, res) => {
  try {
    const { message, label, lang } = req.body;
    const updated = await errorModel.findOneAndUpdate(
      { _id: req.params.id, userId: req.userData.userId },
      { message, label, lang },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: "Note not found or not authorized" });
    }
    res.status(200).json({ message: "Note updated successfully", updated });
  } catch (err) {
    console.error("Error updating note:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

Erouter.delete("/delete/:id", authMiddleware, async (req, res) => {
  try {
    const noteId = req.params.id;
    const userId = req.userData.userId; // 🔄 Correct field from middleware

    const note = await errorModel.findOne({ _id: noteId, userId: userId });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    await errorModel.deleteOne({ _id: noteId });
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (err) {
        console.error("Error deleting note:", err); // ✅ log the real error

    res.status(500).json({ message: "Internal server error" });
  }
});




//all data
Erouter.get('/all', authMiddleware, async (req, res) => {
  try {
    const errors = await errorModel.find({ userId: req.userData.userId }).populate('userId', 'email');
    res.status(200).json(errors);
  } catch (err) {
    console.error("Error fetching errors:", err);
    res.status(500).json({ error: "Internal server error" });
  } });

  
  export default Erouter;